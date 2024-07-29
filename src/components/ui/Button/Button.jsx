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
 * @param {string} [props.type] - Тип кнопки.
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
  type,
  disabled,
}) => {
  // Стили для вариантов кнопок.
  const variantClasses = {
    primary: `
      bg-indigo-500 text-white 
      hover:bg-indigo-600 
      focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50
      active:bg-indigo-700
    `,
    secondary: `
      bg-transparent border border-slate-200 
      hover:bg-slate-100 
      focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50
      active:bg-slate-200
    `,
    negative: `
      bg-rose-500 text-white 
      hover:bg-rose-600 
      focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-50
      active:bg-rose-600
    `,
    ghost: `
      bg-transparent 
      hover:bg-slate-100 
      focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50
      active:bg-slate-200
    `,
    link: `
      bg-transparent underline-offset-4 text-slate-900 
      hover:underline 
      focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50
      active:text-slate-700
      disabled:text-neutral disabled:bg-transparent
    `,
  };

  // Объединение вариантов кнопок, состояний и общих стилей.
  const buttonClasses = cn(
    "rounded inline-flex items-center justify-center min-w-[36px] min-h-[36px] text-md",
    variantClasses[variant],
    className, 
    !icon && "px-4",
    (disabled || isLoading) &&
      "disabled:bg-neutral-200 disabled:text-neutral-400 disabled:pointer-events-none"
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
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
