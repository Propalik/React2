import { useState } from "react";
import { useParams } from "react-router-dom";
import useProductsStore from "../store/useProductsStore";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Image from "../components/ui/Image/Image";
import Alert from "../components/ui/Alert/Alert";

const CardDetail = () => {
  // Получение id из адресной строки через React-router-dom
  const { id } = useParams();

  // Стор для работы с продуктами
  const { getProductById, onToggleFavorite, addToCart } = useProductsStore();

  // Стейт для показа/скрытия и передачи сообщения в Alert
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  // Находим карточку по id.
  const product = getProductById(id);

  // Обработчик добавления товара в корзину
  const handleAddToCart = () => {
    addToCart(product);
    setAlertState({isOpen: true, title: "Добавление товара", subtitle: 'Товар успешно добавлен в корзину.'})
  };

  return (
    <section className="card-details">
      <div className="max-w-7xl mx-auto px-2">
        <Link
          to="/cards"
          className="inline-flex text-indigo-500 hover:text-indigo-600 mb-8"
        >
          <IoIosArrowBack className="mr-1 w-5 h-5" />
          Go back
        </Link>
        <h2 className="mb-4 text-4xl font-bold text-zinc-800">
          {product?.name}
        </h2>
        <div className="max-w-md rounded shadow-lg relative">
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-30 rounded"></div>
            <Image
              className="w-full rounded"
              src={product?.imgSrc}
              alt={product?.title}
            />
          </div>

          <button
            className={`absolute top-0 left-0 m-2 p-2 rounded-full ${
              product?.isFavorite ? "text-indigo-500" : "text-white"
            }`}
            onClick={() => onToggleFavorite(id)}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>
          </button>
          <div className="px-6 py-4">
            <p className="text-gray-600 text-sm mb-2">{product?.description}</p>
            <p className="text-gray-600 text-sm mb-2">{product?.category}</p>
            {product?.rating && (
              <div className="text-yellow-500 mb-2">
                {"★".repeat(Math.floor(product?.rating)) +
                  "☆".repeat(5 - Math.floor(product?.rating))}
              </div>
            )}
            <div className="text-lg font-bold mb-2">{product?.price}$</div>
            <button
              onClick={handleAddToCart}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Alert
        title={alertState?.title}
        subtitle={alertState?.subtitle}
        variant="neutral"
        isOpen={alertState?.isOpen}
        onClose={() =>  setAlertState(!alertState?.isOpen)}
      />
    </section>
  );
};

export default CardDetail;
