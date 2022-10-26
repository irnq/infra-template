const http = require('http');

console.log('Начинаем выполнять запрос в Трекер!');
console.log('my phone number, ', process.env.ORG_ID);

const patchBody = JSON.stringify({
  summary: '*номер и дата релиза*',
  description:
    ' ответственный за релиз <имя того, кто запушил тег>\n коммиты, попавшие в релиз:\n <хеш коммита> <автор коммита> <описание коммита>\n <хеш коммита> <автор коммита> <описание коммита>]\n <хеш коммита> <автор коммита> <описание коммита>\n',
});

const options = {
  host: 'https://api.tracker.yandex.net',
  path: '/v2/issues/HOMEWORKSHRI-142',
  method: 'PATCH',
  headers: {
    OrgId: process.env.ORG_ID,
    Authorization: process.env.OAUTH_TOKEN,
    'Content-Type': 'application/json',
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
});

req.write(patchBody);
req.end();

console.log('данные успешно записаны в трекер!');
