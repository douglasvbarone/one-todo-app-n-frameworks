import { useState } from 'react'
import './App.css'
import initialTodos from '../../shared/initTodos'

function App() {
  const [todos, setTodos] = useState([...initialTodos])
  const [newTodoText, setNewTodoText] = useState('')

  function handleAddTodo(e) {
    e.preventDefault()

    if (!newTodoText) return

    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false
    }
    setTodos([...todos, newTodo])
    setNewTodoText('')
  }

  return (
    <div className='container'>
      <h1>Tasks</h1>

      <form onSubmit={handleAddTodo}>
        <input
          onChange={e => setNewTodoText(e.target.value)}
          type='text'
          placeholder="What's next?"
          value={newTodoText}
        />
        <button type='submit'>+</button>
      </form>

      {todos.length ? (
        <ul>
          {todos.map(todo => (
            <li
              className={`todo ${todo.completed ? 'completed' : ''}`}
              key={todo.id}
            >
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() =>
                  setTodos(
                    todos.map(t => {
                      if (t.id === todo.id) t.completed = !t.completed
                      return t
                    })
                  )
                }
              />
              <span>{todo.text}</span>
              <button
                onClick={() => setTodos(todos.filter(t => t.id != todo.id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div class='empty'>Add some tasks!</div>
      )}
      <footer>
        <span>React</span>
      </footer>
    </div>
  )
}

export default App
