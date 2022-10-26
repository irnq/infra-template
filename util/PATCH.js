const http = require('https');
const core = require('@actions/core');
const github = require('@actions/github');

console.log('Начинаем выполнять запрос в Трекер!');
console.log('------actor');
console.log(github.context.actor);
console.log('------tag');
console.log(github.context.ref.split('/').at(-1));
console.log('------commits');
console.log(github.context.payload.commits);
console.log('------ref-name');
console.log(github.ref_name);
console.log('------actor');
console.log(core.getInput('actor'));
console.log('------commits');
console.log(core.getInput('commits'));
console.log('------version');
console.log(core.getInput('version'));
console.log(new Date().toLocaleDateString());

const date = new Date().toLocaleDateString();

const patchBody = JSON.stringify({
  summary: `номер от ${date}`,
  description: ` ответственный за релиз <имя того, кто запушил тег>
     коммиты, попавшие в релиз:
     <хеш коммита> <автор коммита> <описание коммита>
     <хеш коммита> <автор коммита> <описание коммита>]
     <хеш коммита> <автор коммита> <описание коммита>`,
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
/*
{
  context: Context {
    payload: {
      after: '2edddbbb962e7ccb7b9b21e0cd2bfbd883e4676a',
      base_ref: null,
      before: '0000000000000000000000000000000000000000',
      commits: [],
      compare: 'https://github.com/irnq/infra-template/compare/v0.0.4-3',
      created: true,
      deleted: false,
      forced: false,
      head_commit: [Object],
      pusher: [Object],
      ref: 'refs/tags/v0.0.4-3',
      repository: [Object],
      sender: [Object]
    },
    eventName: 'push',
    sha: '642d6aa0520b7ed4ea3692e32feecf229e9018fe',
    ref: 'refs/tags/v0.0.4-3',
    workflow: 'test and build on release',
    action: '__run_2',
    actor: 'irnq',
    job: 'test-and-build',
    runNumber: 45,
    runId: 3331864653,
    apiUrl: 'https://api.github.com',
    serverUrl: 'https://github.com',
    graphqlUrl: 'https://api.github.com/graphql'
  },
  getOctokit: [Function: getOctokit]
}
*/
