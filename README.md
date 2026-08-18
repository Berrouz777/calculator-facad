# Калькулятор стоимости фасада

Веб-калькулятор для расчёта стоимости мебельного фасада: размеры, профиль, цвет, фрезеровка, петли и заполнение. Итог считается на клиенте и показывается после заполнения обязательных полей (высота, ширина, профиль, цвет).

Живые версии:

- GitHub Pages: [berrouz777.github.io/calculator-facad](https://berrouz777.github.io/calculator-facad/)
- Netlify: [calculator-facad.netlify.app](https://calculator-facad.netlify.app/)

## Стек

- Vue 3 + TypeScript
- Vite
- Sass

## Запуск локально

Нужны Node.js 20+ и npm.

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Сборка и проверка production-версии:

```bash
npm run build
npm run preview
```

Проверка типов:

```bash
npm run type-check
```

## Структура

```
src/
  pages/CalculatorPage.vue     # форма и расчёт
  components/calculator/       # секции формы
  data/calculatorFields.ts     # каталог: профили, цвета, опции
  data/pricing.ts              # прайс (₽ за погонный метр и т.д.)
  types/calculator.ts          # типы
```
