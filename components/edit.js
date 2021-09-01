export default function EditForm({todo}) {
  return (
    <form action={`/api/todo/${todo.todoId}`} method="POST">
      <input type="checkbox" name="checked" defaultChecked={todo.checked} />
      <input type="text" name="text" defaultValue={todo.text} />
      <button type="submit">Update todo</button>
    </form>
  );
}
