#!/bin/bash
msg_error="\033[31m"
msg_ok="\033[32m"
msg_info="\033[6m"
msg_reset="\033[0m"

echo -e "$msg_info #4. Начинаем сборку проекта... $msg_reset"
if npm run build
then
echo -e "$msg_ok ОК: Проект успешно проверен и собран! $msg_reset"
else
echo -e "$msg_error Ошибка при сборке проекта! $msg_reset"
exit 1
fi

echo "устновим @actions/github:"
if npm install '@actions/github'
then
echo -e "$msg_ok ОК: успешно! $msg_reset"
else
echo -e "$msg_error Ошибка при установке @actions/github! $msg_reset"
exit 1
fi

echo -e "$msg_info #5. собираем докер образ c тегом $PROJECT:$TAG $msg_reset"
if docker build . -t $PROJECT:$TAG
then
echo -e "$msg_ok ОК: образ $PROJECT:$TAG собран успешно! $msg_reset"
else
echo -e "$msg_error Ошибка при сборке докер образа! $msg_reset"
exit 1
fi
