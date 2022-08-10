import { createSignal, For, Show } from 'solid-js'
import initialTodos from '../../shared/initTodos'

const [todos, setTodos] = createSignal([...initialTodos])
const [newTodoText, setNewTodoText] = createSignal('')

function App() {
  function updateTodoStatus(id) {
    setTodos(
      todos().map(todo =>
        todo.id == id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  function addTodo(e) {
    e.preventDefault()
    setTodos([
      ...todos(),
      { id: Date.now(), text: newTodoText(), completed: false }
    ])
    setNewTodoText('')
  }

  function deleteTodo(id) {
    setTodos(todos().filter(todo => todo.id != id))
  }

  return (
    <div class='container'>
      <h1>Tasks</h1>

      <form onSubmit={e => addTodo(e)}>
        <input
          value={newTodoText()}
          onInput={e => setNewTodoText(e.currentTarget.value)}
          type='text'
          placeholder="What's next?"
        />
        <button type='submit'>+</button>
      </form>

      <Show when={todos().length}>
        <ul>
          <For each={todos()}>
            {todo => (
              <li classList={{ completed: todo.completed }}>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => updateTodoStatus(todo.id)}
                />
                <span>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            )}
          </For>
        </ul>
      </Show>
      <Show when={!todos().length}>
        <div class='empty'>Add some tasks!</div>
      </Show>
      <footer>
        <span>Solid</span>
      </footer>
    </div>
  )
}

export default App
