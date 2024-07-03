import TodoItem from "./TodoItem";

/**
 * Компонент со списком задач
 * @param {strings[]} - Массив с названиями задач
 * @param {function} props.editTodo - Обработчик клика для редактирования задачи.
 * @param {function} props.deleteTodo - Обработчик клика для удаления задачи.
 */
const TodoList = ({ todos, editTodo, deleteTodo }) => {
  return (
    <ul>
      {!!todos &&
        todos.map((todo) => (
          <TodoItem
            key={crypto.randomUUID()}
            todo={todo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        ))}
    </ul>
  );
};

export default TodoList;
