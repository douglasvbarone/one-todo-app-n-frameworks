<script setup>
import { ref } from 'vue'

const todosInit = [
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

const todos = ref([...todosInit])
const newTodo = ref('')

function onSubmit() {
  if (newTodo.value)
    todos.value.push({ id: Date.now(), text: newTodo.value, completed: false })

  newTodo.value = ''
}

function deleteTodo(id) {
  todos.value = todos.value.filter(todo => todo.id != id)
}
</script>

<template>
  <div class="container">
    <h1>Todos</h1>

    <form @submit.prevent="onSubmit">
      <input placeholder="What's next?" v-model="newTodo" />
      <button type="submit">+</button>
    </form>

    <ul v-if="todos.length">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input
          type="checkbox"
          @change="todo.completed = !todo.completed"
          :checked="todo.completed"
        />
        <span>{{ todo.text }} </span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <div class="empty" v-else>Add some todos!</div>
    <div class="footer">
      <span>VueJS</span>
    </div>
  </div>
</template>

<style scoped></style>
