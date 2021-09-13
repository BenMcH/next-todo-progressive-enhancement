import {useState, useEffect} from 'react';

export default function EditForm({todo}) {
  const [checked, setChecked] = useState(Boolean(todo.checked));
  const [text, setText] = useState(todo.text);
  const [saved, setSaved] = useState(null);

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
        setSaved(true);
      }
    }
  }

  useEffect(() => {
    if (saved === false) {
      const timeout = setTimeout(updateTodo, 1000)

      return () => clearTimeout(timeout);
    }
    if (saved) {
      const timeout = setTimeout(() => setSaved(null), 2500)

      return () => clearTimeout(timeout);
    }
  }, [saved, text, checked]);

  return (
    <form action={`/api/todo/${todo.todoId}`} onChange={() => setSaved(false)} method="POST" onSubmit={updateTodo}>
      <input type="checkbox" name="checked" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
      <input type="text" name="text" value={text} onChange={(event) => setText(event.target.value)} />
      <noscript><button type="submit">Update todo</button></noscript>
      {saved && 'successfully updated!'}
    </form>
  );
}
