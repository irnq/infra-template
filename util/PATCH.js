const http = require('https');
const github = require('@actions/github');

const actor = github.context.actor;
const version = github.context.ref.split('/').at(-1).replace('rc-', '');
const commits = github.context.payload.commits;
const date = new Date().toLocaleDateString();

(async () => {
  const tagsRes = await github
    .getOctokit(process.env.GH_PAT)
    .rest.repos.listTags({ owner: 'irnq', repo: 'infra-template' });
  const tags = tagsRes.data.filter((tag) => tag.name.slice(0, 3) === 'rc-');

  const prevTagId = tags.sort((a, b) => (a > b ? -1 : 1))[1].commit.sha;

  const title = `Релиз №${version} от ${date}`;

  const prevTagIndex = commits.findIndexOf((commit) => commit.id === prevTagId);

  const diffCommits = commits.slice(prevTagIndex);

  const commitsString = diffCommits.reduce((result, commit) => {
    return (
      result +
      `${commit.id}  -  ${commit.author.name}  -  ${commit.message};
  `
    );
  }, '');

  const description = `ответственный за релиз {orange}(${actor})
---
коммиты попавшие в релиз:
${commitsString}`;

  const patchBody = JSON.stringify({
    summary: title,
    description,
  });

  const options = {
    host: 'api.tracker.yandex.net',
    path: '/v2/issues/HOMEWORKSHRI-142',
    method: 'PATCH',
    headers: {
      OrgId: process.env.ORG_ID,
      Authorization: `OAuth ${process.env.OAUTH_TOKEN}`,
      'content-type': 'application/json',
    },
  };

  const callback = function (response) {
    let str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      console.log(str);
    });
  };

  let req = http.request(options, callback);

  req.on('error', (e) => {
    console.error(e);
    throw new Error(`Запрос завершился ошибкой: ${e}`);
  });

  req.write(patchBody);
  req.end();

  console.log('данные успешно записаны в трекер!');
})();
