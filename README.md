# 🌲 сн легендс · QUARK (`sn-legends`)

Официальный персональный сайт-витрина создателя экосистемы **QUARK** в Telegram (`QuarkApp`, `@quarkgiftbot`, `@quarkgift`). Выполнен в фирменной тёмно-лесной эстетике с 3D-колодой экранов, плавными composite-only 60fps анимациями и интерактивным превью Mini App.

---

## ✨ Особенности

- **Интерактивная витрина QUARK**: демонстрация ключевых механик и интерфейсов `QuarkApp` в 3D-колоде устройств.
- **Производительность 60fps**: все CSS и Motion-анимации оптимизированы под композитный рендеринг (`transform` / `opacity`).
- **Готовый деплой**: мультистейдж `Dockerfile` + `nginx.conf` для VPS/контейнеров и конфигурация `wrangler.toml` для Cloudflare Pages / Workers.

---

## 🛠 Технологический стек

- **Frontend**: React 19, TypeScript, Vite, Motion (`framer-motion`)
- **Линтинг**: Oxlint
- **Инфраструктура**: Docker, Docker Compose, Nginx, Cloudflare Wrangler

---

## 🚀 Запуск и сборка

```bash
# Установка зависимостей
npm install

# Локальный сервер разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск в Docker
docker compose up --build -d
```
