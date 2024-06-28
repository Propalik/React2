import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate(); // хук для роутинга

  // Стор для работы с продуктами
  const { products, setFavorite } = useProductsStore();

  // Обработчик клика по карточке
  const handleCardClick = (id) => {
    navigate(`/cards/${id}`);
  };

  return (
    <section className="products">
      <div className="max-w-7xl mx-auto px-2">
        <h2 className="mb-4 text-4xl font-bold text-zinc-800">Products Page</h2>
        <div className="flex flex-wrap gap-9">
          {!!products &&
            products.map((product) => (
              <Card
                key={product?.id}
                details={product}
                onCardClick={handleCardClick}
                onToggleFavorite={setFavorite}
              />
            ))}
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Cards;
