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
  const [isAlertOpen, setAlertOpen] = useState(false);

  // Стейт для показа детальной информации по товару в Drawer
  const [selectedValue, setSelectedValue] = useState(null);

  // Стор для CRUD операций.
  const { items, fetchItems, addItem, editItem, deleteItem } = useItemsStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  /**
   * Обработка отправки формы. Если товар выбран - редактирует, иначе добавляет новый товар.
   *
   * @param {Event} event - Событие отправки формы.
   * @returns {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    addItem(formValues);

    setDrawerOpen(false);

    setAlertOpen(true);

    resetForm();
  };

  /**
   * Обрабатывает редактирование товара.
   *
   * @returns {void}
   */
  const handleEditItem = () => {
    if (selectedValue) {
      editItem(selectedValue?.id, formValues);

      setDrawerOpen(false);

      setSelectedValue(null);
    }
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
      
    }
  };

  // Обработка данных формы.
  const { formValues, handleInput, resetForm } = useForm({
    name: "",
    category: "",
    price: "",
  });

  /**
   * Обрабатывает двойной клик по строке таблицы.
   *
   * @param {Object} rowData - Данные строки, по которой был выполнен двойной клик.
   * @returns {void}
   */
  const handleRowDoubleClick = (rowData) => {
    setSelectedValue(rowData);
    setDrawerOpen(true);
  };

  /**
   * Закрывает компонент Drawer и очищает выбранное значение.
   *
   * @returns {void}
   */
  const hanldeCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedValue(null);
  };

  return (
    <section className="admin">
      <div className="max-w-7xl mx-auto px-2">
        <h2 className="mb-4 text-4xl font-bold text-zinc-800">
          Страница управления товарами
        </h2>

        <button
          className="bg-indigo-500 mb-4 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setDrawerOpen(true)}
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
            onClose={hanldeCloseDrawer}
            title={
              selectedValue
                ? "Редактирование товара"
                : "Добавление нового товара"
            }
          >
            <div className="w-full max-w-xs">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="taskName"
                  >
                    Название товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    defaultValue={selectedValue?.name || formValues?.name}
                    onChange={handleInput}
                    placeholder="Введите название"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="taskName"
                  >
                    Категория товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="category"
                    type="text"
                    defaultValue={
                      selectedValue?.category || formValues?.category
                    }
                    onChange={handleInput}
                    placeholder="Введите категорию"
                    
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="taskName"
                  >
                    Цена товара
                  </label>
                  <input
                    className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="price"
                    type="number"
                    defaultValue={selectedValue?.price || formValues?.price}
                    onChange={handleInput}
                    placeholder="Введите цену"
                    
                  />
                </div>

                {selectedValue && (
                  <>
                    <Button onClick={handleEditItem} variant="primary">
                      Сохранить
                    </Button>
                    <Button variant="negative" onClick={handleDeleteItem}>
                      Удалить
                    </Button>
                  </>
                )}
              </form>
            </div>
          </Drawer>
        )}

        <Alert
          title="Добавление товара."
          subtitle="Товар был успешно добавлен."
          variant="neutral"
          isOpen={isAlertOpen}
          onClose={() => setAlertOpen(false)}
        />
      </div>
    </section>
  );
};

export default Admin;
