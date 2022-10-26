#!/bin/bash
msg_error="\033[31m"
msg_ok="\033[32m"
msg_common="\033[0m"
echo "Начинаем..."

echo "#1. Установка зависимостей:"
if npm ci
then
echo -e "$msg_ok ОК: зависимости установлены! $msg_common"
else
echo -e "$msg_error Ошибка при установке зависимостей! $msg_common"
exit 1
fi

echo "#2. Прогоним проверку на ошибки линтера:"
if npm run lint
then
echo -e "$msg_ok ОК: ошибок линтера нет! $msg_common"
else
echo -e "$msg_error Не прошел проверку линтером! $msg_common"
exit 1
fi

echo "#3. Проверим на ошибки TS:"
if npm run ts
then
echo -e "$msg_ok ОК: ошибок TS нет! $msg_common"
echo -e "$msg_ok ОК: Все проверки ОК!  $msg_common"
exit 0
else
echo -e "$msg_error Не прошел проверку TS! $msg_common"
exit 1
fi



