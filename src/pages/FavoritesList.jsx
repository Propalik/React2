import { useState } from "react";
import Alert from "../components/ui/Alert/Alert";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const FavoritesList = () => {
  const navigate = useNavigate(); // хук для роутинга

  // Достаем функцию для работы с сохраненками
  const { getFavoriteProducts, onToggleFavorite, getProductById } = useProductsStore();

  // Вызываем функцию для показа сохраненок
  const favoritesProducts = getFavoriteProducts();

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
      message: isFavorite ? "Товар удален из сохраненок" : "Товар добавлен в сохраненки"
    });
  };

  return (
    <>
      <section className="favorites min-h-72">
        <div className="max-w-7xl mx-auto px-2">
          <Link
            to="/cards"
            className=" text-indigo-500 hover:text-indigo-600 mb-8 inline-flex"
          >
            <IoIosArrowBack className="mr-1 w-5 h-5" />
            Go back
          </Link>

          <h2 className="mb-4 text-4xl font-bold text-zinc-800">
            {favoritesProducts?.length ? "Previously saved items" : "Favorites list is empty"}
          </h2>

          <div className="flex flex-wrap gap-9">
            {favoritesProducts?.length > 0 &&
              favoritesProducts.map((product) => (
                <Card
                  key={product.id}
                  details={product}
                  onCardClick={handleCardClick}
                  onHeartClick={handleFavoriteAndShowAlert}
                />
              ))}
          </div>
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

export default FavoritesList;
