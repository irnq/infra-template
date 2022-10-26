const http = require('http');

const options = {
  host: 'https://api.tracker.yandex.net',
  path: '/v2/issues/HOMEWORKSHRI-142',
  method: 'PATCH',
  headers: {
    OrgId: process.env.ORG_ID,
    Authorization: process.env.OAUTH_TOKEN,
    'Content-Type': 'application/json',
  },
  body: {
    summary: '*номер и дата релиза*',
    description: `
    ответственный за релиз <имя того, кто запушил тег>\n
    коммиты, попавшие в релиз:\n
    <хеш коммита> <автор коммита> <описание коммита>\n
    <хеш коммита> <автор коммита> <описание коммита>]\n
    <хеш коммита> <автор коммита> <описание коммита>\n`,
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

http.request(options, callback);

/*
fetch('https://api.tracker.yandex.net/v2/issues/HOMEWORKSHRI-142', {
  method: 'PATCH',
  headers: {
    OrgId: process.env.ORG_ID,
    Authorization: process.env.OAUTH_TOKEN,
    'Content-Type': 'application/json',
  },
  body: {
    summary: '*номер и дата релиза*',
    description: `
    ответственный за релиз <имя того, кто запушил тег>\n
    коммиты, попавшие в релиз:\n
    <хеш коммита> <автор коммита> <описание коммита>\n
    <хеш коммита> <автор коммита> <описание коммита>]\n
    <хеш коммита> <автор коммита> <описание коммита>\n`,
  },
})
  .then(() => {
    console.log('Запрос успешно отправлен');
  })
  .catch(() => {
    console.log('Запрос завершился ошибкой');
  });

  */
