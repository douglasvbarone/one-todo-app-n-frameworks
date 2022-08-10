<script>
  import initialTodos from '../../shared/initTodos'
  let todos = [...initialTodos]
  let newTodo = ''

  function addTodo() {
    todos = [...todos, { id: Date.now(), text: newTodo, completed: false }]
  }

  function updateTodoStatus(id) {
    todos = todos.map(todo => {
      if (todo.id === id) todo.completed = !todo.completed
      return todo
    })
  }

  function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
  }
</script>

<main>
  <div class="container">
    <h1>Tasks</h1>

    <form on:submit|preventDefault={addTodo}>
      <input bind:value={newTodo} type="text" placeholder="What's next?" />
      <button type="submit">+</button>
    </form>

    {#if todos.length}
      <ul>
        {#each todos as todo}
          <li class:completed={todo.completed}>
            <input
              type="checkbox"
              on:change={() => updateTodoStatus(todo.id)}
              bind:checked={todo.completed}
            />
            <span>
              {todo.text}
            </span>
            <button on:click={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        {/each}
      </ul>
    {:else}
      <div class="empty">Add some tasks!</div>
    {/if}
    <footer>
      <span>Svelte</span>
    </footer>
  </div>
</main>

<style>
</style>
