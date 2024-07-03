import { useState } from "react";
import TodoList from "./TodoList";

// компонент TodoList принимает массив. Поэтому стейт надо скорректировать для работы с массивом.
const TodoForm = () => {
  // Для управления состоянием компонента
  const [task, setTask] = useState("");

  // Обработчик изменения значения в инпуте
  const handleChange = (event) => {
    console.log(event.target);

    setTask(event.target.value);

    console.log(task);
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="taskName"
          >
            Task name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="taskName"
            type="text"
            placeholder="Your task"
            value={task}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Add task
        </button>
      </form>

      {<TodoList />}
    </div>
  );
};

export default TodoForm;
