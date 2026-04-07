<script setup>
import CardsAtv from '@/components/CardsAtv.vue'
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

let newTask = ref('')
let newName = ref('')
let editId = ref(null)
let editing = ref(false)
let err = ref(false)

function manipular(action, taskPosition, taskName) {
  switch (action) {
    case 'adicionar': {
      if (!tasks.value.some((item) => item.nome === newTask.value)) {
        tasks.value.push({
          id: Math.max(...tasks.value.map((item) => item.id)) + 1,
          nome: newTask.value,
          status: 'pendente',
        })
        newTask.value = ''
      } else {
        err.value = true
        setTimeout(() => {
          err.value = false
        }, 1500)
        newTask.value = ''
      }
      break
    }
    case 'deletar': {
      tasks.value.splice(
        tasks.value.findIndex((item) => item.id === taskPosition),
        1,
      )
      break
    }
    case 'marcar': {
      // Melhorar isso (obs: me sinto um macaco)
      if (
        tasks.value[tasks.value.findIndex((item) => item.id === taskPosition)].status === 'pendente'
      )
        tasks.value[tasks.value.findIndex((item) => item.id === taskPosition)].status = 'concluido'
      else
        tasks.value[tasks.value.findIndex((item) => item.id === taskPosition)].status = 'pendente'
      break
    }
    case 'editar': {
      tasks.value[tasks.value.findIndex((item) => item.id === taskPosition)].nome = taskName
      break
    }
    case 'salvar': {
      const index = tasks.value.findIndex((item) => item.id === editId.value)
      if (index !== -1 && newName.value.trim()) {
        tasks.value[index].nome = newName.value.trim()
      }

      editing.value = false
      editId.value = null
      newName.value = ''
      break
    }
  }
}
const search = ref('')
const filteredTasks = computed(() => {
  if (!search.value) return tasks.value
  return tasks.value.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase().trim())
  })
})
</script>

<template>
  <div class="title">
    <h1>
      Gerenciador De Tarefas
    </h1>
  </div>
  <div class="container">
    <div class="newTask">
      <input type="text" v-model="newTask">
      <button @click="manipular()"></button>
    </div>
    <div class="container-tasks">
      <div class="table-header">
        <div class="search-wrapper">
          <input v-model="search" type="text" placeholder="Buscar tarefa..." class="search-input" />
        </div>
        <div class="column-labels">
          <p>Name</p>
          <p>State</p>
          <p>Actions</p>
        </div>
      </div>

      <CardsAtv
        v-for="item in filteredTasks"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :state="item.state"
        @acao="(payload) => manipular(payload.type, payload.id, payload.name)"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');

:root {
  --bg: #0f1117;
  --surface: #161b27;
  --border: rgba(99, 130, 255, 0.12);
  --accent: #6382ff;
  --text: #e2e8f0;
  --text-muted: #64748b;
  --radius: 10px;
}

.container-tasks {
  font-family: 'IBM Plex Sans', sans-serif;
  background: var(--bg);
  min-height: 100vh;
  padding: 2rem;
  border-radius: 20px;
}

/* ── Header wrapper ─────────────────────────────── */
.table-header {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ── Search input ───────────────────────────────── */
.search-wrapper {
  display: flex;
  width: 90%;
}

.search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: none;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.053);
  width: 100%;
  border-radius: 6px;
  padding: 1rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--text);
  outline: none;
  transition: border-color 200ms ease;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(99, 130, 255, 0.12);
}

/* ── Column labels ──────────────────────────────── */
.column-labels {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  & {
    text-align: center;
  }
}

.column-labels p {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
</style>
