import { useState } from "react";
import useProductsStore from "../store/useProductsStore";
import Stepper from "../components/ui/Stepper/Stepper";
import Button from "../components/ui/Button/Button";
import { LiaTimesSolid } from "react-icons/lia";
import Alert from "../components/ui/Alert/Alert";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Cart = () => {
  // Получение данных из стора (корзина товаров)
  const { cart, deleteProductFromCart } = useProductsStore();

  /**
   * Обработчик для удаления товара из корзины
   * @param {string} productId - id товара, который нужно удалить.
   */
  const handleDeleteProduct = (productId) => {
    deleteProductFromCart(productId);
    setAlertState({
      isOpen: true,
      title: "Удаление товара",
      subtitle: "Товар был удален из корзины.",
    });
  };

  // Стейт для показа/скрытия и передачи сообщения в Alert
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  return (
    <section className="cart">
      <div className="max-w-7xl mx-auto px-2">
        <Link
          to="/cards"
          className=" text-indigo-500 hover:text-indigo-600 mb-8 inline-flex"
        >
          <IoIosArrowBack className="mr-1 w-5 h-5" />
          Go to page Cards
        </Link>
        <div className="flex justify-between items-start">
          <h2 className="mb-4 text-4xl font-bold text-zinc-800">
            {cart?.length ? "Previously saved products" : "Cart is empty"}
          </h2>
          {cart?.length > 0 && <Button variant="primary">Checkout</Button>}
        </div>

        {cart?.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {cart?.map((item) => (
              <div
                key={crypto?.randomUUID()}
                className="border rounded shadow p-4 max-w-3xl relative"
              >
                <Button
                  onClick={() => handleDeleteProduct(item?.id)}
                  className="absolute top-2 right-2"
                >
                  <LiaTimesSolid />
                </Button>
                <div className="flex items-start">
                  <img
                    src={item?.imgSrc}
                    alt={item?.title}
                    className="w-48 h-48 mr-4 object-cover bg-indigo-500"
                  />
                  <div className="flex flex-col items-start w-full">
                    <h3 className="text-xl font-bold mb-4">{item?.name}</h3>
                    <p className="text-gray-600 mb-4">{item?.description}</p>
                    <span className="text-lg font-bold mb-4">
                      {item?.price}$
                    </span>

                    <Stepper
                      step={1}
                      minValue="1"
                      maxValue="10"
                      id={item?.id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Alert
        title={alertState?.title}
        subtitle={alertState?.subtitle}
        variant="neutral"
        isOpen={alertState?.isOpen}
        onClose={() => setAlertState(!alertState?.isOpen)}
      />
    </section>
  );
};

export default Cart;
