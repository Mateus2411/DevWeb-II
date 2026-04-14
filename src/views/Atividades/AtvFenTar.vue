<script setup>
import CardsAtv from '@/components/CardsAtv.vue'
import FormTarefa from '@/components/FormTarefa.vue'
import SearchTarefa from '@/components/SearchTarefa.vue'
import { computed, ref } from 'vue'

const tasks = ref([
  { id: 1, name: 'Configurar repositório Git', state: false },
  { id: 2, name: 'Criar estrutura inicial do projeto', state: false },
  { id: 3, name: 'Instalar dependências do projeto', state: false },
  { id: 4, name: 'Configurar ESLint', state: false },
  { id: 5, name: 'Criar componente de navbar', state: false },
  { id: 6, name: 'Criar página inicial', state: false },
  { id: 7, name: 'Implementar sistema de login', state: false },
  { id: 8, name: 'Criar validação de formulário', state: false },
  { id: 9, name: 'Integrar API de usuários', state: false },
  { id: 10, name: 'Criar dashboard', state: false },
  { id: 11, name: 'Implementar dark mode', state: false },
  { id: 12, name: 'Otimizar performance', state: false },
  { id: 13, name: 'Configurar deploy', state: false },
  { id: 14, name: 'Criar testes unitários', state: false },
  { id: 15, name: 'Documentar API', state: false },
  { id: 16, name: 'Criar página de perfil', state: false },
  { id: 17, name: 'Adicionar notificações', state: false },
  { id: 18, name: 'Revisar código', state: false },
  { id: 19, name: 'Corrigir bugs reportados', state: false },
  { id: 20, name: 'Publicar versão 1.0', state: false },
])

const search = ref('')
const err = ref(false)

const filteredTasks = computed(() => {
  if (!search.value) return tasks.value
  return tasks.value.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase().trim())
  })
})

function handleAddTask(taskName) {
  if (!tasks.value.some((item) => item.name === taskName)) {
    tasks.value.push({
      id: Math.max(...tasks.value.map((item) => item.id), 0) + 1,
      name: taskName,
      state: false,
    })
  } else {
    err.value = true
    setTimeout(() => {
      err.value = false
    }, 1500)
  }
}

function handleCompleteTask(taskId) {
  const task = tasks.value.find((item) => item.id === taskId)
  if (task) {
    task.state = !task.state
  }
}

function handleDeleteTask(taskId) {
  const index = tasks.value.findIndex((item) => item.id === taskId)
  if (index !== -1) {
    tasks.value.splice(index, 1)
  }
}

function handleSaveTask({ id, name }) {
  const task = tasks.value.find((item) => item.id === id)
  if (task) {
    task.name = name
  }
}

function handleSearch(searchTerm) {
  search.value = searchTerm
}
</script>

<template>
  <div class="title">
    <h1>Gerenciador De Tarefas</h1>
  </div>
  <div class="container">
    <FormTarefa :error="err" @adicionar="handleAddTask" />
    <div class="container-tasks">
      <div class="table-header">
        <SearchTarefa @buscar="handleSearch" />
        <div class="column-labels">
          <p>Nome</p>
          <p>Estado</p>
          <p>Ações</p>
        </div>
      </div>

      <CardsAtv
        v-for="item in filteredTasks"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :state="item.state"
        @complete="handleCompleteTask"
        @delete="handleDeleteTask"
        @save="handleSaveTask"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');

.title {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
}

.title h1 {
  margin: 0;
  font-size: 2rem;
  color: #2c3e50;
  font-weight: 600;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.container-tasks {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table-header {
  background: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.column-labels {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  text-align: center;
}

.column-labels p {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #7f8c8d;
}
</style>
