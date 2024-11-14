//Т.к. надо прикрепить один файл - то вся логика в нём (в реальной app-ке она естественно будет декомпозирована)
//если надо посмотреть всё реакт-приложение - оно тут - https://github.com/Mr-Che-87/FedAG-test2/

import axios from 'axios';
import styles from "./Todos.module.scss"; 
import { useState } from 'react';

//API:
export const fetchGetTodos = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return response.data; 
  } catch (error) {
    console.error(error);
    return [];   
  }
};

//Сам компонент:
export default function Todos() {
  const [todos, setTodos] = useState<any[]>([]); //стейт задач
  const [showData, setShowData] = useState(false); //стейт отображения данныхх

  //хэндлер для кнопки отображения списка задач:
  const handleToggleData = async () => {
    if (!showData) {
      const fetchedTodos = await fetchGetTodos();
      setTodos(fetchedTodos);
    }
    setShowData(!showData);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleToggleData}>
        {showData ? "Назад" : "Отобразить данные"}
      </button>

      {showData && (
        <div className={styles.usersList}>
          {[...new Set(todos.map((todo) => todo.userId))].map((userId) => (
            <div key={userId} className={styles.userContainer}>
              <h2>{`Пользователь-${userId}`}</h2>
              <h3>список задач:</h3>
              <ul>
                {todos
                  .filter((todo) => todo.userId === userId)
                  .map((todo) => (
                    <li key={todo.id} className={styles.todoItem}>
                      {todo.title}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
