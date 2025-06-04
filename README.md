# Кондиционеры Питер Telegram Bot

Демонстрационный Telegram-бот для каталога кондиционеров. Создан по техническому заданию.

## Установка

```bash
npm install
cp .env.local .env
npm run seed # загрузить тестовые данные
```

## Запуск локально

```bash
node src/index.js
```

Бот использует SQLite для хранения данных. Для деплоя на Vercel файл `api/telegramHook.js`
экспортируется как serverless функция.

## Деплой на Vercel

Создайте в корне файл `vercel.json` (уже присутствует в репозитории) со следующей
конфигурацией:

```json
{
  "version": 2,
  "builds": [{ "src": "api/telegramHook.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/api/telegramHook", "dest": "api/telegramHook.js" }]
}
```

Это гарантирует, что запросы к `/api/telegramHook` будут направлены в функцию бота.
Не забудьте указать значение `WEBHOOK_URL` в `.env` вида
`https://<your-app>.vercel.app/api/telegramHook` и установить вебхук ботом.
Важно: в настройках проекта на Vercel параметр **Root Directory** должен
оставаться `.` (корень репозитория), иначе `vercel.json` и функция не будут найдены.
Так как файловая система Vercel доступна только для чтения, укажите переменную
`DB_URL` вида `sqlite:///tmp/database.sqlite` или используйте внешнюю базу данных.
