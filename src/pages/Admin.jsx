import useForm from "../hooks/useForm";
import { useEffect, useState } from "react";
import { Drawer } from "../components/ui/Drawer/Drawer";
import Alert from "../components/ui/Alert/Alert";
import Table from "../components/ui/Table/Table";
import useItemsStore from "../store/useItemsStore";
import Button from "../components/ui/Button/Button";

const Admin = () => {
  // Стейт для скрытия/показа компонента Drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Стейт для скрытия/показа компонента Alert
  const [alertData, setAlertData] = useState({
    title: "",
    subtitle: "",
    variant: "neutral",
    isOpen: false,
  });

  // Стейт для показа детальной информации по товару в Drawer
  const [selectedValue, setSelectedValue] = useState(null);

  // Стейт для переключения режима редактирования
  const [isEditing, setIsEditing] = useState(false);

  // Стор для CRUD операций.
  const { items, fetchItems, addItem, editItem, deleteItem } = useItemsStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Обработка данных формы.
  const { formValues, handleInput, resetForm } = useForm({
    name: "",
    category: "",
    price: "",
  });

  /**
   * Обработка отправки формы.
   * Если товар выбран, то редактируем его, иначе добавляем новый товар.
   *
   * @param {Event} event - Событие отправки формы.
   * @returns {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedValue) {
      // Если товар выбран, редактируем его
      editItem(selectedValue?.id, formValues);

      setAlertData({
        title: "Редактирование товара.",
        subtitle: "Товар был успешно отредактирован.",
        variant: "neutral",
        isOpen: true,
      });
    } else {
      // Если товар не выбран, добавляем новый товар
      addItem(formValues);
      setAlertData({
        title: "Добавление товара.",
        subtitle: "Товар был успешно добавлен.",
        variant: "neutral",
        isOpen: true,
      });
    }
    setDrawerOpen(false);
    resetForm();
  };

  /**
   * Обрабатывает редактирование товара.
   *
   * @returns {void}
   */
  const handleEditItem = () => {
    setIsEditing(true);
  };

  /**
   * Обрабатывает удаление товара.
   *
   * @returns {void}
   */
  const handleDeleteItem = () => {
    if (selectedValue) {
      deleteItem(selectedValue?.id);
      setDrawerOpen(false);
      setSelectedValue(null);
      setIsEditing(false); // Сбрасываем режим редактирования
      setAlertData({
        title: "Удаление товара.",
        subtitle: "Товар был удален.",
        variant: "neutral",
        isOpen: true,
      });
    }
  };

  /**
   * Обрабатывает двойной клик по строке таблицы.
   *
   * @param {Object} rowData - Данные строки, по которой был выполнен двойной клик.
   * @returns {void}
   */
  const handleRowDoubleClick = (rowData) => {
    setSelectedValue(rowData);
    setDrawerOpen(true);
    setIsEditing(false); // Режим просмотра по умолчанию
  };

  /**
   * Закрывает компонент Drawer и очищает выбранное значение.
   *
   * @returns {void}
   */
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedValue(null);
    setIsEditing(false); // Сбрасываем режим редактирования
    resetForm();
  };

  return (
    <section className="admin">
      <div className="max-w-7xl mx-auto px-2">
        <h2 className="mb-4 text-4xl font-bold text-zinc-800">
          Страница управления товарами
        </h2>

        <button
          className="bg-indigo-500 mb-4 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setSelectedValue(null);
            setIsEditing(true);
            setDrawerOpen(true);
          }}
        >
          Добавить товар
        </button>

        <Table
          headers={[
            { key: "name", title: "Название" },
            { key: "category", title: "Категория" },
            { key: "price", title: "Цена" },
          ]}
          data={items}
          onRowDoubleClick={handleRowDoubleClick}
        />

        {isDrawerOpen && (
          <Drawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            title={
              selectedValue
                ? isEditing
                  ? "Редактирование товара"
                  : "Чтение данных по товару"
                : "Добавление нового товара"
            }
          >
            <div className="w-full max-w-xs">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Название товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    defaultValue={formValues?.name || selectedValue?.name}
                    onChange={handleInput}
                    placeholder="Введите название"
                    readOnly={!isEditing}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Категория товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="category"
                    type="text"
                    defaultValue={
                      formValues?.category || selectedValue?.category
                    }
                    onChange={handleInput}
                    placeholder="Введите категорию"
                    readOnly={!isEditing}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Цена товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="price"
                    type="number"
                    defaultValue={formValues?.price || selectedValue?.price}
                    onChange={handleInput}
                    placeholder="Введите цену"
                    readOnly={!isEditing}
                  />
                </div>

                <div className="flex gap-4">
                  {!isEditing && selectedValue && (
                    <>
                      <Button variant="primary" onClick={handleEditItem}>
                        Редактировать
                      </Button>
                      <Button variant="negative" onClick={handleDeleteItem}>
                        Удалить
                      </Button>
                    </>
                  )}
                  {isEditing && <Button variant="primary">Сохранить</Button>}
                </div>
              </form>
            </div>
          </Drawer>
        )}

        <Alert
          title={alertData?.title}
          subtitle={alertData?.subtitle}
          variant={alertData?.variant}
          isOpen={alertData?.isOpen}
          onClose={() => {
            setAlertData((prevAlertData) => ({
              isOpen: !prevAlertData.isOpen,
            }));
          }}
        />
      </div>
    </section>
  );
};

export default Admin;
