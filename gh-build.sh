#!/bin/bash
msg_error="\033[31m"
msg_ok="\033[32m"
msg_common="\033[0m"
echo "Начинаем сборку проекта..."

if npm run build
then
echo -e "$msg_ok ОК: Проект успешно проверен и собран! $msg_common"
else
echo -e "$msg_error Ошибка при сборке проекта! $msg_common"
exit 1
fi

echo "устновим @actions/github:"
if npm install '@actions/github'
then
echo -e "$msg_ok ОК: успешно! $msg_common"
else
echo -e "$msg_error Ошибка при установке @actions/github! $msg_common"
exit 1
fi

echo "$PROJECT - project"