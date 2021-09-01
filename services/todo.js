const todos = []

export const getTodos = () => {
  return todos
}

export const addTodo = (todo) => {
  todos.push(todo)

  return todos;
}

export const updateTodo = (todo) => {
  let todoIndex = todos.findIndex(({todoId}) => todoId === todo.todoId);

  if (todoIndex >= 0) {
    todos[todoIndex] = todo

    return todo
  }

  return null;
}
