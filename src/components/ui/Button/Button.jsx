import { BiLoaderAlt } from "react-icons/bi";
import { cn } from "../../../utils/merge-styles";

/**
 * Компонент кнопка.
 *
 * @param {object} props - Свойства компонента.
 * @param {string} props.className - Дополнительные классы для кнопки.
 * @param {function} props.onClick - Обработчик события клика.
 * @param {string} [props.variant="primary"] - Вариант стиля кнопки.
 * @param {React.ReactNode} [props.leftIcon] - Иконка перед текстом кнопки.
 * @param {React.ReactNode} [props.rightIcon] - Иконка после текста кнопки.
 * @param {React.ReactNode} [props.icon] - Иконка внутри кнопки.
 * @param {boolean} [props.isLoading=false] - Состояние загрузки кнопки.
 * @param {string} [props.loadingText="Loading..."] - Текст, отображаемый при загрузке.
 * @param {React.ReactNode} props.children - Текст или элементы внутри кнопки.
 * @param {boolean} [props.disabled=false] - Состояние неактивной кнопки.
 * @returns {JSX.Element} Элемент кнопки.
 */
const Button = ({
  className,
  onClick,
  variant = "primary",
  leftIcon,
  rightIcon,
  icon,
  isLoading,
  loadingText,
  children,
  disabled,
}) => {
  // Стили для вариантов кнопок.
  const variantClasses = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-600",
    secondary: "bg-transparent border border-slate-200 hover:bg-slate-100 ",
    negative: "bg-rose-500 text-white hover:bg-rose-600",
    ghost: "bg-transparent hover:bg-slate-100",
    link: "bg-transparent underline-offset-4 hover:underline text-slate-900 disabled:text-neutral disabled:bg-transparent",
  };

  // Объединение вариантов кнопок, состояний и общих стилей.
  const buttonClasses = cn(
    "rounded inline-flex items-center justify-center min-w-[36px] min-h-[36px] text-md",
    className,
    !icon && "px-4",
    variantClasses[variant],
    (disabled || isLoading) && "disabled:bg-neutral-200 disabled:text-neutral-400 disabled:pointer-events-none"
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      type="button"
    >
      {isLoading && (
        <>
          <BiLoaderAlt className="animate-spin pointer-events-none mr-2" />
          {loadingText}
        </>
      )}
      {!isLoading && (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {icon}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
