import './style.css'

let todos = [
  {
    id: 324234,
    text: 'Uma tarefa',
    completed: false
  },
  {
    id: 365734,
    text: 'Outra tarefa',
    completed: false
  },
  {
    id: 658754,
    text: 'Uma tarefa feita',
    completed: true
  }
]

function onSubmit(e) {
  e.preventDefault()

  const newTodoInput = document.querySelector('form input')
  const newTodo = newTodoInput.value

  if (!newTodo) {
    alert('Type something!')
    return
  }

  todos.push({
    id: Date.now(),
    text: newTodo,
    completed: false
  })

  newTodoInput.value = ''

  renderTodos()
}

function renderTodos() {
  const todoList = document.querySelector('ul')

  if (todos.length == 0) {
    todoList.innerHTML = ':('
    return
  }

  todoList.innerHTML = ''

  todos.forEach(todo => {
    const newLi = document.createElement('li')

    newLi.classList.add('todo')
    newLi.dataset.id = todo.id

    if (todo.completed) newLi.classList.add('completed')

    const newCheckbox = document.createElement('input')
    newCheckbox.type = 'checkbox'
    newCheckbox.checked = todo.completed
    newCheckbox.addEventListener('click', updateTodoStatus)
    newLi.appendChild(newCheckbox)

    const newSpan = document.createElement('span')
    newSpan.innerText = todo.text
    newLi.appendChild(newSpan)

    const newDeleteButton = document.createElement('button')
    newDeleteButton.innerText = 'Delete'
    newDeleteButton.addEventListener('click', deleteTodo)
    newLi.appendChild(newDeleteButton)

    todoList.appendChild(newLi)
  })
}

function deleteTodo(e) {
  const todoId = e.srcElement.parentElement.dataset.id

  todos = todos.filter(todo => todo.id != todoId)

  renderTodos()
}

function updateTodoStatus(e) {
  const todoId = e.srcElement.parentElement.dataset.id

  todos = todos.map(todo => {
    if (todo.id == todoId) todo.completed = !todo.completed

    return todo
  })

  renderTodos()
}

document.getElementsByTagName('form')[0].addEventListener('submit', onSubmit)

renderTodos()
