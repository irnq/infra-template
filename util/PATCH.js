const http = require('https');

console.log('Начинаем выполнять запрос в Трекер!');
console.log('my phone number, ', process.env.ORG_ID);

const patchBody = JSON.stringify({
  summary: '*номер и дата релиза*',
  description:
    ' ответственный за релиз <имя того, кто запушил тег>\n коммиты, попавшие в релиз:\n <хеш коммита> <автор коммита> <описание коммита>\n <хеш коммита> <автор коммита> <описание коммита>]\n <хеш коммита> <автор коммита> <описание коммита>\n',
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
