<script setup>
import { onMounted, ref } from 'vue'

const tarefas = ref([
  { id: 1, nome: 'Configurar repositório Git', status: 'pendente' },
  { id: 2, nome: 'Criar estrutura inicial do projeto', status: 'pendente' },
  { id: 3, nome: 'Instalar dependências do projeto', status: 'pendente' },
  { id: 4, nome: 'Configurar ESLint', status: 'pendente' },
  { id: 5, nome: 'Criar componente de navbar', status: 'pendente' },
  { id: 6, nome: 'Criar página inicial', status: 'pendente' },
  { id: 7, nome: 'Implementar sistema de login', status: 'pendente' },
  { id: 8, nome: 'Criar validação de formulário', status: 'pendente' },
  { id: 9, nome: 'Integrar API de usuários', status: 'pendente' },
  { id: 10, nome: 'Criar dashboard', status: 'pendente' },
  { id: 11, nome: 'Implementar dark mode', status: 'pendente' },
  { id: 12, nome: 'Otimizar performance', status: 'pendente' },
  { id: 13, nome: 'Configurar deploy', status: 'pendente' },
  { id: 14, nome: 'Criar testes unitários', status: 'pendente' },
  { id: 15, nome: 'Documentar API', status: 'pendente' },
  { id: 16, nome: 'Criar página de perfil', status: 'pendente' },
  { id: 17, nome: 'Adicionar notificações', status: 'pendente' },
  { id: 18, nome: 'Revisar código', status: 'pendente' },
  { id: 19, nome: 'Corrigir bugs reportados', status: 'pendente' },
  { id: 20, nome: 'Publicar versão 1.0', status: 'pendente' },
])
onMounted(() => {})
const novaTarefa = ref('')

const toggleStatus = (tarefa) => {
  tarefa.status = tarefa.status === 'pendente' ? 'concluido' : 'pendente'
}

const removerTarefa = (id) => {
  const index = tarefas.value.findIndex((t) => t.id === id)
  if (index !== -1) {
    tarefas.value.splice(index, 1)
  }
}
const erro = ref(false)
const adicionarTarefa = () => {
  if (tarefas.value.some((t) => t.nome === novaTarefa.value.trim())) {
    // alert('Tarefa já existe!')
    erro.value = true
    setTimeout(() => {
      erro.value = false
    }, 2000)
    novaTarefa.value = ''
  } else if (novaTarefa.value.trim()) {
    const novoId = tarefas.value.length > 0 ? Math.max(...tarefas.value.map((t) => t.id)) + 1 : 1
    tarefas.value.push({
      id: novoId,
      nome: novaTarefa.value,
      status: 'pendente',
    })
    novaTarefa.value = ''
  }
}
</script>

<template>
  <section>
    <div v-if="erro" class="erro">
      <p>Tarefa já existe!</p>
    </div>
    <div class="container">
      <div class="titulo">
        <h1>Gerenciador De Tarefas</h1>
      </div>

      <div class="adicionar-tarefa">
        <input
          v-model="novaTarefa"
          @keyup.enter="adicionarTarefa"
          :disabled="erro"
          type="text"
          placeholder="✏️ Digite uma nova tarefa..."
        />
        <button :disabled="erro" @click="adicionarTarefa"><span>➕</span> Adicionar</button>
      </div>

      <div class="info-tarefas">
        <p>
          <span class="badge concluido">{{
            tarefas.filter((t) => t.status === 'concluido').length
          }}</span>
          Concluídas
        </p>
        <p>
          <span class="badge pendente">{{
            tarefas.filter((t) => t.status === 'pendente').length
          }}</span>
          Pendentes
        </p>
        <p>
          <span class="badge total">{{ tarefas.length }}</span>
          Total
        </p>
      </div>

      <div class="areaTarefas">
        <div class="header-tarefas">
          <p>Nome</p>
          <p>Estado</p>
          <p>Ações</p>
        </div>
        <div class="tarefas">
          <div v-for="tarefa in tarefas" :key="tarefa.id" class="tarefa">
            <div class="nome">
              <p>{{ tarefa.nome }}</p>
            </div>
            <div class="status">
              <p :class="tarefa.status">
                {{ tarefa.status }}
              </p>
            </div>
            <div class="acoes">
              <button
                @click="toggleStatus(tarefa)"
                class="btn-toggle"
                :title="
                  tarefa.status === 'pendente' ? 'Marcar como concluída' : 'Marcar como pendente'
                "
              >
                {{ tarefa.status === 'pendente' ? '↻' : '✓' }}
              </button>
              <button @click="removerTarefa(tarefa.id)" class="btn-remover" title="Remover tarefa">
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f8f9fa;
}

.erro {
  position: absolute;
  padding: 1rem;
  background-color: #e74c3c;
  color: white;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
  font-size: large;
}

.container {
  width: 100%;
  max-width: 900px;
}

.titulo {
  text-align: center;
  margin-bottom: 2rem;
}

.titulo h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  font-weight: 700;
}

.areaTarefas {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.header-tarefas {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  background: #34495e;
  font-weight: 600;
  color: #fff;
}

.header-tarefas p {
  margin: 0;
  text-align: center;
}

.tarefas {
  max-height: 500px;
  overflow-y: auto;
}

.tarefas::-webkit-scrollbar {
  width: 8px;
}

.tarefas::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.tarefas::-webkit-scrollbar-thumb {
  background: #bdc3c7;
  border-radius: 4px;
}

.tarefas::-webkit-scrollbar-thumb:hover {
  background: #95a5a6;
}

.tarefa {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  transition: background 0.2s;
}

.tarefa:hover {
  background: #f8f9fa;
}

.tarefa:last-child {
  border-bottom: none;
}

.nome p {
  margin: 0;
  text-align: left;
  color: #2c3e50;
  font-weight: 500;
  line-height: 1.4;
}

.status {
  display: flex;
  justify-content: center;
}

.status p {
  margin: 0;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
  min-width: 100px;
  text-align: center;
}

.status .pendente {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.status .concluido {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.adicionar-tarefa {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.adicionar-tarefa input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.adicionar-tarefa input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.adicionar-tarefa button {
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.adicionar-tarefa button span {
  font-size: 1.2rem;
}

.adicionar-tarefa button:hover {
  background: linear-gradient(135deg, #229954, #1e8449);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
}

.info-tarefas {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.info-tarefas p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #555;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  padding: 0 0.6rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
}

.badge.concluido {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.badge.pendente {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.badge.total {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.acoes {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.acoes button {
  padding: 0.5rem 0.8rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 45px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-toggle {
  background: #3498db;
}

.btn-toggle:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.btn-remover {
  background: #e74c3c;
}

.btn-remover:hover {
  background: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
}

.acoes button:active {
  transform: translateY(0);
}
</style>
