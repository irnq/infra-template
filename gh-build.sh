#!/bin/bash
echo "Начинаем сборку проекта..."

if npm run build
then
echo -e "$msg_ok ОК: Проект успешно проверен и собран! $msg_common"
else
echo -e "$msg_error Ошибка при сборке проекта! $msg_common"
exit 1
fi

echo "Добавим информацию в трекер..."
if `node ./util/PATCH.js`
then
echo -e "$msg_ok ОК: Информация внесена в трекер! $msg_common"
else
echo -e "$msg_error Произошла ошибка при обращении к трекеру! $msg_common"
exit 1
fi