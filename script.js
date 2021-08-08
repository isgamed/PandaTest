"use strict";

function tableSearch() {
  let phrase = document.getElementById('search-text'),
      table = document.getElementById('infoTable'),
      regPhrase = new RegExp(phrase.value, 'i'),
      flag = false;
    /* phrase, table - содержимое элементов поискового окна и таблицы,
    regPhrase - объект регулярного выражения для сопоставления текста с шаблоном,
    игнорирует регистр текста (i), флаг - переменная для результата сравнения*/
  for (let i = 1; i < table.rows.length; i++) {
    // проходим циклом по строкам
    flag = false;
    for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
    // проходим циклом по ячейкам строки
      flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
    // сравниваем значение ячейки с шаблоном
      if (flag) break;
    // если значение содержит шаблон, переходим к следующей ячейке
    }
    if (flag) {
      table.rows[i].style.display = "";
      // если совпадение - оставляем строку как есть
    } else {
      table.rows[i].style.display = "none";
        // иначе - невидимая строка
    }
  }
}

function tableSort(n) {
  let table = document.getElementById("infoTable"),
      rows = table.getElementsByTagName("tr"),
      switching = true,
      sortDirection = 'up',
      switchcount = 0,
      i = 1;

 	while (switching) {
    switching = false;
    /* Цикл, который проходит по парам строк и сравнивает их */
    for (i = 1; i < (rows.length - 1); i++) {
      let x = rows[i].getElementsByTagName("td")[n].innerHTML.toLowerCase(),
          y = rows[i + 1].getElementsByTagName("td")[n].innerHTML.toLowerCase();
      if (!isNaN(x)) {
        // если видим число, то сравниваем как числа
        x = +x;
        y = +y;
      }
      if (sortDirection == "up" && x > y || sortDirection == "down" && x < y) {
        // Если направление сортировки и условие совпадает, то меняем местами
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
        // console.log (switchcount);
        break;
      }
    }
    if (switchcount == 0 && sortDirection == "up") {
        // Если счетчик сбросился на 0, то меняем направление сортировки
        sortDirection = "down";
        switching = true;
      }
  }
}

function paginator() {
  const tableBody = document.getElementById("infoTableBody"),
        paginatorOblect = document.querySelector('.pagination'),
        table = document.getElementById("infoTable"),
        rows = table.getElementsByTagName("tr"),
        rowsPerPage = 4,
        pagesCount = Math.floor((rows.length - 1) / rowsPerPage) + 1;
  
  for (let i = 1; i <= pagesCount; i++) {
		// проходим циклом по номерам страниц и делаем кнопки
    paginatorOblect.innerHTML += `
      <li class="page-item"><a class="page-link" href="#">${i}</a></li>
    `;
  }

  let tabbleArray = createArray(); // превращаем таблицу в массив
 
  document.querySelectorAll('.page-link').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      console.log (`You press # ${i+1}`);
      tableBody.innerHTML = "";
      
      /* после нажатия на первую кнопку пагинации очищаем таблицу 
      и показываем через массив только требуемое количество элементов */ 
      let start = i * rowsPerPage,
          end = start + rowsPerPage;

      for (start; start < end; start++) {
        if (start == tabbleArray.length) break;
        tableBody.innerHTML += `<tr><td>${tabbleArray[start].palyer} </td> <td>${tabbleArray[start].rating}</td></tr>`;
      }
    });
  });


}

paginator();

// Дополнительная функция превращения таблицы в массив
function createArray () {
  let tableElements = document.querySelectorAll("tbody > tr"), arrayWithData = [];

  Array.from(tableElements, e => {
    let childNodes = e.getElementsByTagName("td");
    arrayWithData.push({
      palyer: childNodes[0].textContent,
      rating: childNodes[1].textContent
    });
  });

  return arrayWithData;
}

