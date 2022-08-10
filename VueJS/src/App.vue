<script setup>
import { ref } from 'vue'
import initialTodos from '../../shared/initTodos'

const todos = ref([...initialTodos])
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
    <h1>Tasks</h1>

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
    <footer>
      <span>Vue</span>
    </footer>
  </div>
</template>

<style scoped></style>
