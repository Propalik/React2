import { useState } from "react";
import Button from "../Button/Button";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

/**
 * Компонент пагинация.
 * @param {number} totalItems - Общее количество элементов.
 * @param {number} itemsPerPage - Количество элементов на странице.
 * @param {Function} onPageChange - Функция обратного вызова для обновления текущей страницы.
 * @returns {JSX.Element} - Компонент пагинации.
 */
const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Общее количество страниц
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница

  // Если currentPage = 1, мы находимся на первой странице.
  // startIndex: (1 - 1) * itemsPerPage = 0.
  // endIndex: 0 + itemsPerPage = itemsPerPage.
  // Фотографии с индексами от 0 до itemsPerPage - 1 будут отображаться на первой стр.

  // Если currentPage = 2, мы находимся на второй странице.
  // startIndex: (2 - 1) * itemsPerPage = itemsPerPage.
  // endIndex: itemsPerPage + itemsPerPage = 2 * itemsPerPage.
  // Фотографии с индексами от itemsPerPage до 2 * itemsPerPage - 1 будут отображаться на второй стр.

  // Если currentPage = 3, мы находимся на третьей странице.
  // startIndex: (3 - 1) * itemsPerPage = 2 * itemsPerPage.
  // endIndex: 2 * itemsPerPage + itemsPerPage = 3 * itemsPerPage.
  // Фотографии с индексами от 2 * itemsPerPage до 3 * itemsPerPage - 1 будут отображаться на третьей стр.

  /**
   * Обработчик изменения страницы.
   * @param {number} page - Номер новой страницы.
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  /**
   * Генерация номеров страниц для отображения.
   * @returns {JSX.Element[]} - Массив элементов JSX с номерами страниц.
   */
  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    // Обрезаем начало, если текущая страница находится близко к началу
    if (startPage < 1) {
      startPage = 1;
      // startPage + 2: текущая страница и две следующие страницы. ограничиваем отображение не более чем двумя страницами впереди текущей.
      // totalPages: общее количество страниц. Мы не можем отобразить больше страниц, чем есть.
      // Math.min() берет наименьшее значение из двух, а это значит, что endPage будет равен либо startPage + 2, либо totalPages.
      endPage = Math.min(startPage + 2, totalPages);
    }

    // Обрезаем конец, если текущая страница находится близко к концу
    if (endPage > totalPages) {
      endPage = totalPages;
      // startPage - 2: текущая страница и две предыдущие страницы. Мы хотим отобразить не более двух страниц перед текущей.
      // 1: минимальное значение для startPage, чтобы не уйти за пределы диапазона страниц.
      startPage = Math.max(endPage - 2, 1);
    }

    // Генерируем номера страниц
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant="link"
          onClick={() => handlePageChange(i)}
          className={`${
            currentPage === i
              ? "bg-indigo-500 text-white"
              : "hover:bg-indigo-600 hover:text-white active:bg-indigo-600 active:text-white"
          }`}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <div id="pagination" className="flex justify-center">
      <Button
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="link"
      >
        <IoChevronBackOutline />
      </Button>

      {generatePageNumbers()}

      <Button
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        variant="link"
      >
        <IoChevronForwardOutline />
      </Button>
    </div>
  );
};

export default Pagination;
