export default function NewForm({newTodoId}) {
  return (
    <form action="/api/todo" method="POST">
      <input required type="text" name="text" autoComplete="off" />
      <input type="hidden" name="todoId" value={newTodoId} />
    </form>
  )
}
