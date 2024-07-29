import Button from "../Button/Button";

/**
 * Компонент вкладки.
 *
 * @param {Object} props - Свойства компонента.
 * @param {string[]} props.categories - Массив категорий для отображения в виде вкладок.
 * @param {string} props.activeCategory - Активная категория, определяющая текущую выбранную вкладку.
 * @param {Function} props.onCategoryChange - Функция, вызываемая при изменении категории. Принимает новую категорию как аргумент.
 *
 * @returns {JSX.Element} Компонент вкладок.
 */
const Tabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <nav className="mb-6">
      <div className="flex gap-4">
        {categories?.length > 0 &&
          categories?.map((category) => (
            <Button
              key={category}
              variant="secondary"
              className={`${activeCategory === category && "bg-slate-200"}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
      </div>
    </nav>
  );
};

export default Tabs;
