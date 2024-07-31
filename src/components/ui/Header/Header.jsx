import { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useProductsStore from "../../../store/useProductsStore";
import { Modal } from "../Modal/Modal";
import Input from "../Input/Input";
import { useAuth } from "../../../hooks/useAuth";
import Image from "../Image/Image";
import { IoHomeOutline } from "react-icons/io5";
import { PiCards } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { CgComponents } from "react-icons/cg";

/** Массив пунктов меню */
const navItems = [
  { name: "Home", path: "/", icon: <IoHomeOutline className="w-5 h-5 ml-1" /> },
  {
    name: "Components",
    path: "/components",
    icon: <CgComponents className="w-5 h-5 ml-1" />,
  },
  { name: "Cards", path: "/cards", icon: <PiCards className="w-5 h-5 ml-1" /> },
  {
    name: "Admin",
    path: "/admin",
    icon: <RiAdminLine className="w-5 h-5 ml-1" />,
  },
];

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
  // Стейт для показа/скрытия модального окна (для регистрации).
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Стейт для показа/скрытия модального окна (для входа).
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Использование кастомного хука для обработки данных
  const { formValues, formErrors, handleInput, resetForm } = useForm({
    login: "",
    password: "",
  });

  // Кастомный хук для регистрации, входа, выхода
  const { user, onRegister, onLogin, onLogout } = useAuth();

  // Получаем текущее местоположение (URL) из хука
  const location = useLocation();

  // Хук для навигации (роутинга) по страницам
  const navigate = useNavigate();

  // Количество сохраненных ранее товаров, корзины и общего кол-ва в корзине
  const { getFavoriteProducts, getAllCartProducts, cart } = useProductsStore();

  // Стейт для хранения количества товаров в корзине
  const [cartCount, setCartCount] = useState(0);

  // Получаем количество избранных продуктов
  const favoritesCount = getFavoriteProducts()?.length;

  useEffect(() => {
    setCartCount(getAllCartProducts());
  }, [cart, getAllCartProducts]);

  // Показ страницы с сохраненками
  const handleToOpenFavorites = () => {
    navigate(`/favorites`);
  };

  // Показ страницы корзина товаров
  const handleToCartOpen = () => {
    navigate(`/cart`);
  };

  /**
   * Определяет, активна ли ссылка.
   * @param {string} path - Путь ссылки.
   * @returns {boolean} ссылка активна или нет.
   */
  const isActiveLink = (path) => {
    return (
      location?.pathname === path ||
      (path === "/cards" && location?.pathname?.startsWith("/cards"))
    );
    // return location?.pathname === path; // Если нет вложенных страниц
  };

  // Обработка формы при регистрации
  const handleRegisterForm = (event) => {
    event.preventDefault();

    onRegister(formValues);

    setShowRegisterModal(false); // Закрываем Modal

    resetForm(); // Сбрасываем форму
  };

  // Обработка формы при входе в систему
  const handleLoginForm = (event) => {
    event.preventDefault();

    onLogin(formValues);

    setShowLoginModal(false); // Закрываем Modal

    resetForm(); // Сбрасываем форму
  };

  // Обработчик закрытия модального окна (логин)
  const closeLoginModalAndResetForm = () => {
    setShowLoginModal(false);
    resetForm(); // Сбрасываем форму
  };

  // Обработчик закрытия модального окна (регистрация)
  const closeRegisterModalAndResetForm = () => {
    setShowRegisterModal(false);
    resetForm(); // Сбрасываем форму
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-2">
        <div className="relative flex justify-between h-16">
          <nav className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <NavLink to="/" className="flex-shrink-0 flex items-center">
              <Image
                className="w-36 object-contain"
                isCritical={true}
                src="../../../assets/header/logo.svg"
                alt="Logo"
              />
            </NavLink>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                // Скрыть пункт меню "Admin" если пользователь не администратор
                if (
                  item?.name === "Admin" &&
                  (!user || user?.role !== "admin")
                ) {
                  return null;
                }

                return (
                  <NavLink
                    to={item?.path}
                    key={item?.path}
                    className={`text-zinc-800 inline-flex items-center px-1 pt-1 text-sm ${
                      isActiveLink(item?.path)
                        ? "text-indigo-500 border-b-2 border-indigo-500"
                        : "hover:text-indigo-500"
                    }`}
                  >
                    {item?.name}
                    {item?.icon}
                  </NavLink>
                );
              })}
              {/* <Navigation items={navItems}/> */}
            </div>
          </nav>
          <div id="buttons-wrapper" className="inline-flex items-center">
            {!user ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="border-2 text-indigo-500 border-indigo-500 font-medium py-2 px-4 rounded"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="ml-3 border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Register
                </button>
              </>
            ) : (
              <button
                type="button"
                className="ml-3 border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded"
                onClick={onLogout}
              >
                Logout
              </button>
            )}
          </div>
          {showRegisterModal && (
            <Modal
              title="Registration form"
              isOpen={showRegisterModal}
              onClose={closeRegisterModalAndResetForm}
            >
              <form onSubmit={handleRegisterForm}>
                <Input
                  label="Login"
                  name="login"
                  type="text"
                  value={formValues?.login}
                  onInput={handleInput}
                  placeholder="Enter your login"
                  error={formErrors?.login}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formValues?.password}
                  onInput={handleInput}
                  placeholder="Enter your password"
                  error={formErrors?.password}
                  required
                />

                <button
                  className="bg-indigo-500 text-white font-medium py-2 px-4 rounded"
                  type="submit"
                >
                  Submit data
                </button>
              </form>
            </Modal>
          )}
          {showLoginModal && (
            <Modal
              title="Login form"
              isOpen={showLoginModal}
              onClose={closeLoginModalAndResetForm}
            >
              <form onSubmit={handleLoginForm}>
                <Input
                  label="Login"
                  name="login"
                  type="text"
                  value={formValues?.login}
                  onInput={handleInput}
                  placeholder="Enter your login"
                  error={formErrors?.login}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formValues?.password}
                  onInput={handleInput}
                  placeholder="Enter your password"
                  error={formErrors?.password}
                  required
                />

                <button
                  className="bg-indigo-500 text-white font-medium py-2 px-4 rounded"
                  type="submit"
                >
                  Submit data
                </button>
              </form>
            </Modal>
          )}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={handleToOpenFavorites}
              className={`relative bg-transparent p-1 mr-3 rounded-full text-gray-400 hover:text-gray-500   ${
                location?.pathname === "/favorites" ? "text-indigo-500" : ""
              }`}
            >
              <svg
                fill="currentColor"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path d="M16,2a9,9,0,0,0-6,15.69V30l6-4,6,4V17.69A9,9,0,0,0,16,2Zm4,24.26-2.89-1.92L16,23.6l-1.11.74L12,26.26V19.05a8.88,8.88,0,0,0,8,0ZM20.89,16A7,7,0,1,1,23,11,7,7,0,0,1,20.89,16Z" />
                <rect className="fill-none" width="32" height="32" />
              </svg>

              {!!favoritesCount && (
                <span className="w-5 h-5 text-xs px-1 leading-5 text-white inline-flex items-center justify-center bg-indigo-500 rounded-full absolute top-[-4px] right-[-4px]">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={handleToCartOpen}
              id="cart"
              type="button"
              className={`relative bg-transparent p-1 mr-3 rounded-full text-gray-400 hover:text-gray-500   ${
                location?.pathname === "/cart" ? "text-indigo-500" : ""
              }`}
            >
              <svg
                fill="currentColor"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M17 24H21V28H17zM24 24H28V28H24zM17 17H21V21H17zM24 17H28V21H24z"></path>
                <path d="M28,11h-6V7c0-1.7-1.3-3-3-3h-6c-1.7,0-3,1.3-3,3v4H4c-0.6,0-1,0.4-1,1c0,0.1,0,0.1,0,0.2l1.9,12.1c0.1,1,1,1.7,2,1.7H15v-2	H6.9L5.2,13H28V11z M12,7c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v4h-8V7z"></path>
              </svg>
              {!!cartCount && (
                <span className="w-5 h-5 text-xs px-1 leading-5 text-white inline-flex items-center justify-center bg-indigo-500 rounded-full absolute top-[-4px] right-[-4px]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
