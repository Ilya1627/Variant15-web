// ============================================================
// catalog-page.js — Вывод и фильтрация каталога (Пара 25)
// ============================================================

// 1. Массив данных (перенесен из catalog.js)
const catalog = [
  {
    position: 1,
    name: "SpaceX",
    specs: "2002 · Космические ракеты",
    description: "Аэрокосмическая компания, разрабатывающая ракеты Falcon и корабль Starship."
  },
  {
    position: 2,
    name: "Tesla",
    specs: "2003 · Электромобили",
    description: "Производитель электромобилей и систем хранения энергии. Маск возглавил компанию в 2004 году."
  },
  {
    position: 3,
    name: "Neuralink",
    specs: "2016 · Нейроинтерфейсы",
    description: "Компания разрабатывает интерфейсы «мозг-компьютер» для помощи людям с ограничениями здоровья."
  }
];

// 2. Функция фильтрации (перенесена из catalog.js)
function filterByText(items, query) {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") {
    return items;
  }
  return items.filter(item => item.name.toLowerCase().includes(normalized));
}

// 3. Находим элементы на странице
const catalogList = document.querySelector("#catalog-list");
const statusText = document.querySelector("#status");

// 4. Функция отрисовки карточек
function renderCatalog(items) {
  // Очищаем контейнер перед новым выводом
  catalogList.replaceChildren();

  // Создаем карточки для каждого элемента
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = item.name;

    const specs = document.createElement("p");
    specs.className = "specs";
    specs.textContent = item.specs;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = item.description;

    // Собираем карточку: заголовок, характеристика, описание
    card.append(title, specs, description);

    // Добавляем карточку в контейнер
    catalogList.append(card);
  }

  // Обновляем статус (счетчик)
  if (items.length === 0) {
    statusText.textContent = "Ничего не найдено";
  } else {
    statusText.textContent = "Показано: " + items.length + " из " + catalog.length;
  }
}

// 5. Первый вывод всех карточек при загрузке
renderCatalog(catalog);

// 6. Обработчик события для поиска
const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", function () {
  const found = filterByText(catalog, searchInput.value);
  renderCatalog(found);
});