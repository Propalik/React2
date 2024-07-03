/**
 * Компонент строка для задач.
 * @param {string} props.todo - Название задачи
 * @param {function} props.editTodo - Обработчик клика для редактирования задачи.
 * @param {function} props.deleteTodo - Обработчик клика для удаления задачи.
 */
const TodoItem = ({ todo, editTodo, deleteTodo }) => {
  return (
    <li>
      <span>{todo}</span>
      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-normal py-2 px-4 rounded"
        onClick={() => editTodo(todo)}
      >
        Edit
      </button>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-normal py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => deleteTodo(todo?.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
