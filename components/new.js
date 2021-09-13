import {useState} from 'react';
import {v4} from 'uuid';


export default function NewForm({newTodoId, addTodo}) {
  const [text, setText] = useState('');

  const onSubmit = async (event) => {
    if (typeof fetch === 'function') {
      event.preventDefault();

      const todo = {text, todoId: v4()};

      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
      
      if (response.ok) {
        addTodo(todo);
        setText('');
      }
    }
  }

  return (
    <form action="/api/todo" method="POST" onSubmit={onSubmit}>
      <input required type="text" name="text" value={text} onChange={(event) => setText(event.target.value)} autoComplete="off" />
      <input type="hidden" name="todoId" value={newTodoId} />
    </form>
  )
}
