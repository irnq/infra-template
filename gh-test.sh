#!/bin/bash
msg_error="\033[31m"
msg_ok="\033[32m"
msg_info="\033[36m"
msg_reset="\033[0m"

echo "Начинаем..."

echo -e "$msg_info #1. Установка зависимостей: $msg_reset"
if npm ci
then
echo -e "$msg_ok ОК: зависимости установлены! $msg_reset"
else
echo -e "$msg_error Ошибка при установке зависимостей! $msg_reset"
exit 1
fi

echo -e "$msg_info #2. Прогоним проверку на ошибки линтера: $msg_reset"
if npm run lint
then
echo -e "$msg_ok ОК: ошибок линтера нет! $msg_reset"
else
echo -e "$msg_error Не прошел проверку линтером! $msg_reset"
exit 1
fi

echo -e "$msg_info #3. Проверим на ошибки TS: $msg_reset"
if npm run ts
then
echo -e "$msg_ok ОК: ошибок TS нет! $msg_reset"
echo -e "$msg_ok ОК: Все проверки ОК!  $msg_reset"
exit 0
else
echo -e "$msg_error Не прошел проверку TS! $msg_reset"
exit 1
fi



