// ============================================================
// catalog.js — Вариант 15 «Спорт после пар» (Пара 21–23)
// ============================================================

// ===== 1. Функция из пары 20 =====
function getResult(quantityText, unitAmount, extraAmount) {
  if (quantityText.trim() === "") {
    return "Ошибка: укажите количество";
  }
  const quantity = Number(quantityText);
  if (!Number.isFinite(quantity)) {
    return "Ошибка: введите число";
  }
  if (quantity <= 0) {
    return "Ошибка: нужно положительное целое количество";
  }
  if (!Number.isInteger(quantity)) {
    return "Ошибка: нужно положительное целое количество";
  }
  const totalAmount = unitAmount * quantity + extraAmount;
  return "Итого: " + totalAmount;
}

// ===== 2. Данные выбора и расчёта =====
const selectedName = "Волейбол";
const quantityText = "4";
const unitValue = 45;
const extraValue = 10;

// ===== 3. Массив каталога с тремя карточками =====
const catalog = [
  {
    position: 1,
    name: "Растяжка",
    specs: "Студия · 45 минут",
    description: "Спокойные упражнения на гибкость"
  },
  {
    position: 2,
    name: "Бадминтон",
    specs: "Зал А · 60 минут",
    description: "Парные упражнения и точность движений"
  },
  {
    position: 3,
    name: "Волейбол",
    specs: "Зал Б · 90 минут",
    description: "Командная игра и работа с мячом"
  }
];

// ===== 4. Функция поиска по названию =====
function filterByText(items, query) {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") {
    return items;
  }
  return items.filter(item => item.name.toLowerCase().includes(normalized));
}

// ===== 5. Подготовка к циклу =====
let foundCount = 0;
console.log("Записей: " + catalog.length);

// ===== 6. Обход каталога =====
for (const item of catalog) {
  if (item.name === selectedName) {
    foundCount++;
    console.log(item.position + ". " + item.name);
    console.log("Характеристика: " + item.specs);
    console.log("Описание: " + item.description);
    console.log("Выбрано для расчёта: " + item.name);
    const message = getResult(quantityText, unitValue, extraValue);
    console.log(message);
    console.log("Единица расчёта: минут");
  }
}

// ===== 7. Итоговые проверки =====
console.log("Найдено записей: " + foundCount);

if (foundCount === 0) {
  console.log("Запись не найдена: " + selectedName);
} else if (foundCount > 1) {
  console.log("Проверьте повторяющиеся названия");
}

// ============================================================
// ===== 8. ОПЫТЫ ДЛЯ ПАРЫ 22 (проверка в консоли) =====
// ============================================================

console.log("\n--- ТАБЛИЦА ДАННЫХ ---");
console.table(catalog);
console.log("catalog.length =", catalog.length);

console.log("\n--- МЕТОД MAP: Получение списка названий ---");
const names = catalog.map(item => item.name);
console.log("names =", names);
console.log("names.length =", names.length);

console.log("\n--- МЕТОД FILTER: Отбор названий длиннее 8 символов ---");
const longNames = catalog.filter(item => item.name.length > 8);
console.log("longNames =", longNames);
console.log("longNames.length =", longNames.length);

console.log("\n--- МЕТОД FIND: Поиск одной записи 'Волейбол' ---");
const found = catalog.find(item => item.name === selectedName);
if (found) {
  console.log("found.specs =", found.specs);
  console.log("found.description =", found.description);
} else {
  console.log("Запись не найдена");
}

console.log("\n--- ФУНКЦИЯ FILTERBYTEXT (испытания) ---");
console.log("Пустой запрос:", filterByText(catalog, "").length);
console.log("Часть названия:", filterByText(catalog, "бол"));
console.log("Другой регистр:", filterByText(catalog, "  БОЛ  ").length);
console.log("Нет совпадений:", filterByText(catalog, "плавание").length);

console.log("\n--- ДОПОЛНИТЕЛЬНО: Обратный порядок (map + reverse) ---");
console.log("Обратный порядок:", catalog.map(item => item.name).reverse());

console.log("\n--- ДОПОЛНИТЕЛЬНО: Поиск по позиции (find) ---");
function findByPosition(items, position) {
  return items.find(item => item.position === position);
}
console.log("findByPosition(2):", findByPosition(catalog, 2));
console.log("findByPosition(99):", findByPosition(catalog, 99));


// ============================================================
// ===== 9. РАБОТА С DOM (Пара 23) =====
// ============================================================

// 1. Находим элементы на странице по их id
const statusElement = document.querySelector("#status");
const showButton = document.querySelector("#show-names");
const namesList = document.querySelector("#names");

// 2. Находим ГЛАВНЫЙ заголовок h1 и меняем его текст на "Ilon"
const mainTitle = document.querySelector("#main-title");
mainTitle.textContent = "Ilon";

// 3. Выводим количество записей в абзац #status
statusElement.textContent = "Записей в каталоге: " + catalog.length;

// 4. Функция для отрисовки списка названий
function renderNames() {
  namesList.replaceChildren();

  for (const item of catalog) {
    const line = document.createElement("li");
    line.textContent = item.name;
    namesList.append(line);
  }

  statusElement.textContent = "Список показан. Всего записей: " + catalog.length;
}

// 5. Вешаем обработчик события на кнопку
showButton.addEventListener("click", renderNames);