# Лабораторная работа 11 — CI/CD

Простое React-приложение (форма обратной связи) с автоматизированными UI-тестами на Selenium и пайплайном GitHub Actions.

## Стек

- React + Vite
- Selenium WebDriver (Node.js)
- GitHub Actions (CI + GitHub Pages)

## Ветки

| Ветка | Назначение |
|-------|------------|
| `main` | Продакшен, деплой на GitHub Pages |
| `dev`  | Основная ветка разработки |
| `fix`  | Ветка для задач (фичи, багфиксы) — создаётся от `dev` |

**Не коммитьте напрямую в `main`.** Используйте Pull Request: `fix` → `dev` → `main`.

## Локальный запуск

```bash
npm install
npm run dev          # http://localhost:5173
npm run build
npm run test:ci      # сборка + Selenium-тесты
```

## Сценарий сдачи (п. 7)

1. Переключитесь на ветку `fix`.
2. Измените текст на форме или кнопке (например, кнопку «Отправить» → «Send»).
3. Закоммитьте и отправьте `fix` на GitHub.
4. Создайте Pull Request: `fix` → `dev`. Дождитесь CI; если тесты упали — верните ожидаемый текст («Отправить») и обновите PR.
5. После успешных тестов выполните merge в `dev`.
6. Создайте Pull Request: `dev` → `main`, дождитесь тестов и выполните merge.

## Демонстрация падения тестов (п. 5)

Измените текст кнопки `#submit-btn` с «Отправить» на другой — тест `кнопка отправки имеет текст «Отправить»` завершится с ошибкой.

## GitHub Pages (п. 10–11)

После merge в `main` workflow автоматически публикует `dist/` на GitHub Pages **только если** job `test` прошёл успешно.

В настройках репозитория: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

URL: `https://<username>.github.io/<repo-name>/`

## Создание репозитория на GitHub

```bash
git init
git add .
git commit -m "Initial commit: React form, Selenium tests, CI/CD"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
git checkout -b dev
git push -u origin dev
git checkout -b fix
git push -u origin fix
```
