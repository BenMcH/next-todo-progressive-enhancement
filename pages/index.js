import {useState} from 'react';
import {v4} from 'uuid';

import styles from '../styles/Home.module.css'
import {getTodos} from '../services/todo'
import NewForm from '../components/new';
import EditForm from '../components/edit';

export default function Home({todos, newTodoId}) {
  const [localTodos, setLocalTodos] = useState(todos);

  const addTodo = (todo) => setLocalTodos([...localTodos, todo]);

  return (
    <div className={styles.container}>
      <NewForm newTodoId={newTodoId} addTodo={addTodo} />
      <ul>
        {localTodos.map((todo) => (
          <li key={todo.todoId}>
            <EditForm todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = () => {
  return {
    props: {
      todos: getTodos(),
      newTodoId: v4()
    }
  }
}
