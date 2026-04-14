<script setup>
import { ref } from 'vue'

const search = ref('')

function handleSearch() {
  emit('buscar', search.value)
}

const emit = defineEmits(['buscar'])
</script>

<template>
  <div class="search-wrapper">
    <input
      v-model="search"
      type="text"
      placeholder="Buscar tarefa..."
      class="search-input"
      @input="handleSearch"
    />
  </div>
</template>

<style scoped>
.search-wrapper {
  display: flex;
  width: 100%;
}

.search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: none;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.053);
  border-radius: 6px;
  padding: 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: #2c3e50;
  outline: none;
  transition: border-color 200ms ease, background 200ms ease;
}

.search-input::placeholder {
  color: #95a5a6;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
}
</style>
