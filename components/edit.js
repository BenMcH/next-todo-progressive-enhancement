import {useState, useEffect} from 'react';

const states = {
  SETTLED: 'SETTLED',
  PENDING_SAVE: 'PENDING_SAVE',
  SAVED: 'SAVED'
}

export default function EditForm({todo}) {
  const [state, setState] = useState(states.SETTLED);
  const [checked, setChecked] = useState(Boolean(todo.checked));
  const [text, setText] = useState(todo.text);

  const updateTodo = async (event) => {
    if (typeof fetch === 'function') {
      if (event) {
        event.preventDefault();
      }
      const response = await fetch(`/api/todo/${todo.todoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text, checked})
      });

      if (response.ok) {
        setState(states.SAVED);
      }
    }
  }

  useEffect(() => {
    if (state === states.PENDING_SAVE) {
      const timeout = setTimeout(updateTodo, 1000)

      return () => clearTimeout(timeout);
    }
    if (state === states.SAVED) {
      const timeout = setTimeout(() => setState(states.SETTLED), 2500)

      return () => clearTimeout(timeout);
    }
  }, [state, text, checked]);

  return (
    <form action={`/api/todo/${todo.todoId}`} onChange={() => setState(states.PENDING_SAVE)} method="POST" onSubmit={updateTodo} className="edit-form">
      <input type="checkbox" name="checked" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
      {!checked &&
        <input type="text" name="text" value={text} onChange={(event) => setText(event.target.value)} />
      }
      {checked &&
        <span>{text}</span>
      }
      <noscript><button type="submit">Update todo</button></noscript>
      <span className={`${state === states.SAVED && "fade-show"} fade-hidden success-message-message`}>- ✓ Saved</span>
    </form>
  );
}
