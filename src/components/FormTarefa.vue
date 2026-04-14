<script setup>
import { ref } from 'vue'

const newTask = ref('')
const err = ref(false)

defineProps({
  error: Boolean,
})

const emit = defineEmits(['adicionar'])

function handleAddTask() {
  if (newTask.value.trim()) {
    emit('adicionar', newTask.value.trim())
    newTask.value = ''
  }
}

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    handleAddTask()
  }
}

defineExpose({
  newTask,
  err,
})
</script>

<template>
  <div class="newTask">
    <input
      v-model="newTask"
      type="text"
      placeholder="Adicionar nova tarefa..."
      @keydown="handleKeyDown"
      :class="{ 'error-input': error }"
    />
    <button @click="handleAddTask" class="add-btn" title="Adicionar tarefa">➕</button>
  </div>
</template>

<style scoped>
.newTask {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

input.error-input {
  border-color: #e74c3c;
  animation: shake 0.3s;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  font-weight: 600;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.add-btn:active {
  transform: translateY(0);
}
</style>
