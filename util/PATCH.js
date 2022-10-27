const http = require('https');
const github = require('@actions/github');

const actor = github.context.actor;
const version = github.context.ref.split('/').at(-1).replace('rc-', '');
const commits = github.context.payload.commits;
const date = new Date().toLocaleDateString();

const title = `Релиз №${version} от ${date}`;

const commitsString = commits.reduce((result, commit) => {
  return (
    result +
    `${commit.id}  -  ${commit.author.name}  -  ${commit.message};
  `
  );
}, '');

console.log(commits);
console.log('repository');
console.log(github.context.repository);
console.log('octokit');
console.log(github.getOctokit(process.env.GH_PAT));

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
