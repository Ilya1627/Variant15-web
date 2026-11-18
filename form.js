// ============================================================
// form.js — Обработка формы с доп. услугами и срочностью
// ============================================================

// 1. Функция расчёта (обновленная)
function getResult(quantityText, unitAmount, extraAmount, multiplier) {
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

  // Считаем базовую стоимость
  const baseAmount = unitAmount * quantity;

  // Применяем коэффициент срочности (например, 1.0, 1.2, 1.5)
  // Math.round округляет до целого, чтобы не было копеек
  const urgentAmount = Math.round(baseAmount * multiplier);

  // Прибавляем доп. услуги (гид, трансфер) и общую подготовку
  const totalAmount = urgentAmount + extraAmount;

  return "Итого: " + totalAmount;
}

// 2. Справочник цен для компаний
const prices = {
  "spacex": 60,
  "tesla": 45,
  "neuralink": 90
};

// 3. Находим элементы
const form = document.querySelector("form");
const result = document.querySelector("#result");

// 4. Обработчик отправки
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Читаем количество и компанию
  const quantityText = document.querySelector("#quantity").value;
  const select = document.querySelector("#company");
  const companyValue = select.value;
  const itemName = select.options[select.selectedIndex].text;
  const unitValue = prices[companyValue];

  // НОВОЕ: Считаем дополнительные услуги
  let extraServices = 10; // Базовая подготовка (было extraValue = 10)

  // Проверяем чекбоксы (галочки)
  const isGuide = document.querySelector("#extra1").checked;
  const isTransfer = document.querySelector("#extra2").checked;

  if (isGuide) {
    extraServices += 15; // Если нужен гид, добавляем 15
  }
  if (isTransfer) {
    extraServices += 20; // Если нужен трансфер, добавляем 20
  }

  // НОВОЕ: Считаем срочность
  const levelElement = document.querySelector("#level");
  const levelValue = Number(levelElement.value); // от 1 до 5

  // Формула срочности: 1 -> 1.0, 2 -> 1.1, 3 -> 1.2, 4 -> 1.3, 5 -> 1.4
  const multiplier = 1.0 + (levelValue - 1) * 0.1;

  // Вызываем обновленную функцию getResult
  const message = getResult(quantityText, unitValue, extraServices, multiplier);

  // Выводим результат
  result.textContent = itemName + ". " + message;
});