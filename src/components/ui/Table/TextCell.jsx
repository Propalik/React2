/**
 * Компонент ячейка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {string} props.value - Содержимое ячейки.
 * @returns {JSX.Element} Элемент JSX.
 */
const TextCell = ({ value }) => (
  <div className="flex items-center border border-gray-300 flex-grow w-2">
    {value}
  </div>
);

export default TextCell;
