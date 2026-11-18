// 1. Даём значениям имена (исходные данные)
const itemName = "Свет и цвет";
const unitPrice = 200;           // Цена одного билета
let quantityText = "4";          // Количество посетителей (строка!)
const extraPrice = 130;          // Добавочная величина (учитывается один раз)
const isTraining = true;         // Учебные данные

// 2. Выводим исходные данные
console.log("Название:", itemName);
console.log("Учебные данные:", isTraining);

// 3. Преобразуем строку в число
const quantity = Number(quantityText);

// 4. Собираем расчёт (цена * количество + добавочная величина)
const totalPrice = unitPrice * quantity + extraPrice;

// 5. Выводим результат
console.log("Количество посетителей:", quantity);
console.log("Общая стоимость:", totalPrice, "усл. руб.");

// 6. Выводим типы данных
console.log("Тип строки количества:", typeof quantityText);
console.log("Тип количества после преобразования:", typeof quantity);
console.log("Тип итога:", typeof totalPrice);
console.log("Тип учебного признака:", typeof isTraining);