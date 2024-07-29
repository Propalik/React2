import { useState, useEffect } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert/Alert";
import Tabs from "../components/ui/Tabs/Tabs";

const Cards = () => {
  const navigate = useNavigate(); // хук для роутинга

  // Стор для работы с продуктами
  const {
    products,
    getFilteredProducts,
    getCategories,
    onToggleFavorite,
    getProductById,
  } = useProductsStore();

  console.log(products)

  // Стейт для активной категории
  const [activeCategory, setActiveCategory] = useState("All");

  // Стейт для и фильтрации продуктов
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Стейт для категорий (чтобы передать в компонент табы)
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    products && setCategories(getCategories());

    products && setFilteredProducts(getFilteredProducts(activeCategory));
  }, [products, activeCategory, getFilteredProducts, getCategories]);

  // Обработчик клика по карточке
  const handleCardClick = (id) => {
    navigate(`/cards/${id}`);
  };

  // Стейт для скрытия/показа и передачи сообщения в Alert
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: "",
  });

  // // Обработчик закрытия компонента Alert
  const handleCloseAlert = () => {
    setAlertState({ ...alertState, isOpen: false });
  };

  // // Обработчик добавления товара в сохраненки и показа уведомления
  const handleFavoriteAndShowAlert = (id) => {
    // Достаем из стора поле isFavorite выбранного продукта
    const { isFavorite } = getProductById(id);

    onToggleFavorite(id); // вкл/выкл товара в сохраненки

    setAlertState({
      isOpen: true,
      message: isFavorite
        ? "Товар удален из сохраненок"
        : "Товар добавлен в сохраненки",
    });
  };

  return (
    <>
      <section className="products">
        <div className="max-w-7xl mx-auto px-2">
          <h2 className="mb-4 text-4xl font-bold text-zinc-800">
            Products Page
          </h2>
          <Tabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <div className="flex flex-wrap gap-9">
            {!!filteredProducts &&
              filteredProducts?.map((product) => (
                <Card
                  key={product?.id}
                  details={product}
                  onCardClick={handleCardClick}
                  onHeartClick={handleFavoriteAndShowAlert}
                />
              ))}
          </div>
          <div></div>
        </div>
      </section>
      <Alert
        title="Сохранение товара."
        subtitle={alertState?.message}
        variant="neutral"
        isOpen={alertState?.isOpen}
        onClose={handleCloseAlert}
      />
    </>
  );
};

export default Cards;
