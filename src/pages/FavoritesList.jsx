import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { Link, useNavigate } from "react-router-dom";

const FavoritesList = () => {
  const navigate = useNavigate(); // хук для роутинга
  
  // Достаем функцию для работы с сохраненками
  const { getFavoriteProducts, setFavorite } = useProductsStore();

  // Вызываем функцию для показа сохраненок
  const favoritesProducts = getFavoriteProducts();

  // Обработчик клика по карточке
  const handleCardClick = (id) => {
    navigate(`/cards/${id}`);
  };

  return (
    <section className="favorites min-h-72">
      <div className="max-w-7xl mx-auto px-2">
        <Link
          to="/cards"
          className=" text-indigo-500 hover:text-indigo-600 border-b-2 border-b-indigo-500 mb-8 inline-flex"
        >
          Вернуться карточкам
        </Link>

        <h2 className="mb-4 text-4xl">
          {favoritesProducts?.length ? "Сохраненные ранее товары." : "У вас нет сохраненных товаров."}
        </h2>
        <div className="flex flex-wrap gap-9">
          {favoritesProducts?.length > 0 &&
            favoritesProducts.map((product) => (
              <Card
                key={product.id}
                details={product}
                onCardClick={handleCardClick}
                onToggleFavorite={setFavorite}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FavoritesList;
