import TextCell from "./TextCell";

/**
 * Компонент строка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {object} props.rowData - Объект с характеристиками передавайемой сущности.
 * @returns {JSX.Element} Элемент JSX.
 */
const TableRow = ({ rowData }) => {
  // Получает все ключи объекта rowData, кроме ключа id
  const rowKeys = Object.keys(rowData || {}).filter((key) => key !== "id");

  return (
    <div className="flex flex-row">
      {rowKeys?.map((key) => (
        <TextCell key={crypto.randomUUID()} value={rowData?.[key]} />
      ))}
    </div>
  );
};

export default TableRow;
