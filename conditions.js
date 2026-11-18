    console.log("Расчёт моего приложения");

    // ===== 1. Исходные данные =====
    const itemName = "Растяжка";    // название выбранной позиции
    const quantityText = "4";       // количество занятий — строка в кавычках
    const unitValue = 45;           // минут на одно занятие
    const extraValue = 10;          // минут на общую подготовку (учитывается один раз)
    const isTraining = true;        // признак учебных данных; в формулу не входит

    // Вывод исходных данных
    console.log("Название:", itemName);
    console.log("Количество (текст):", quantityText);
    console.log("Минут на занятие:", unitValue);
    console.log("Минут на подготовку:", extraValue);

    // Проверка типов
    console.log("typeof quantityText:", typeof quantityText); // string
    console.log("typeof unitValue:", typeof unitValue);       // number

    // ===== 2. Функция: получает данные, проверяет и отдаёт сообщение =====
    function getResult(quantityText, unitAmount, extraAmount) {
      // Отказ для пустой строки и одних пробелов (до Number)
      if (quantityText.trim() === "") {
        return "Ошибка: укажите количество";
      }

      const quantity = Number(quantityText);

      // Отказ для нечислового и бесконечного значения (после Number)
      if (!Number.isFinite(quantity)) {
        return "Ошибка: введите число";
      }

      // Отказ для неположительного количества
      if (quantity <= 0) {
        return "Ошибка: нужно положительное целое количество";
      }

      // Отказ для нецелого количества
      if (!Number.isInteger(quantity)) {
        return "Ошибка: нужно положительное целое количество";
      }

      // Расчёт и возврат сообщения
      const totalAmount = unitAmount * quantity + extraAmount;
      return "Итого: " + totalAmount;
    }

    // ===== 3. Вызов с исходными данными =====
    const resultMessage = getResult(quantityText, unitValue, extraValue);
    console.log(resultMessage); // Ожидается: Итого: 190

    // ===== 4. Одиннадцать подписанных испытаний =====
    // Ожидаемые итоги:
    //  "4"   -> 45*4 + 10 = 190
    //  "1"   -> 45*1 + 10 = 55
    //  "3"   -> 45*3 + 10 = 145
    //  " 2 " -> 45*2 + 10 = 100

    console.log("Мой вариант (\"4\"):", getResult("4", unitValue, extraValue));               // Итого: 190
    console.log("Одна единица (\"1\"):", getResult("1", unitValue, extraValue));              // Итого: 55
    console.log("Три единицы (\"3\"):", getResult("3", unitValue, extraValue));              // Итого: 145
    console.log("Пустое поле (\"\"):", getResult("", unitValue, extraValue));                 // Ошибка: укажите количество
    console.log("Только пробелы (\" \"):", getResult(" ", unitValue, extraValue));            // Ошибка: укажите количество
    console.log("Слово (\"два\"):", getResult("два", unitValue, extraValue));                 // Ошибка: введите число
    console.log("Бесконечность (\"Infinity\"):", getResult("Infinity", unitValue, extraValue)); // Ошибка: введите число
    console.log("Ноль (\"0\"):", getResult("0", unitValue, extraValue));                      // Ошибка: нужно положительное целое количество
    console.log("Отрицательное (\"-1\"):", getResult("-1", unitValue, extraValue));           // Ошибка: нужно положительное целое количество
    console.log("Дробное (\"1.5\"):", getResult("1.5", unitValue, extraValue));               // Ошибка: нужно положительное целое количество
    console.log("Пробелы вокруг числа (\" 2 \"):", getResult(" 2 ", unitValue, extraValue));  // Итого: 100

    // ===== 5. Два дополнительных испытания для строки "2" =====
    // База для двух единиц: 45*2 + 10 = 100
    console.log("База для 2:", getResult("2", unitValue, extraValue));                        // Итого: 100
    console.log("Величина на единицу +10:", getResult("2", unitValue + 10, extraValue));      // Итого: 120 (больше на 20)
    console.log("Общая добавка +10:", getResult("2", unitValue, extraValue + 10));            // Итого: 110 (больше на 10)