# Кондиционеры Питер Telegram Bot

Демонстрационный Telegram-бот для каталога кондиционеров. Создан по техническому заданию.

## Установка

```bash
npm install
cp .env.example .env # заполните значения
```

## Запуск локально

```bash
node src/index.js
```

Бот использует SQLite для хранения данных. Для деплоя на Vercel файл `src/api/telegramHook.js` экспортируется как serverless функция.
