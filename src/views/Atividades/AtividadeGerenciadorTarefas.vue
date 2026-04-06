<script setup>
import { computed, ref } from 'vue'

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

const novaTarefa = ref('')
const erro = ref(false)
const procurar = ref('')

const editando = ref(false)
const editName = ref('')
const novoNome = ref('')
const editId = ref(null)

const tarefasFiltradas = computed(() => {
  if (!procurar.value) return tarefas.value

  return tarefas.value.filter((item) =>
    item.nome.toLowerCase().includes(procurar.value.toLowerCase().trim()),
  )
})

function manipular(acao, posicaoTarefa, tarefaNome) {
  switch (acao) {
    case 'adicionar': {
      if (!tarefas.value.some((item) => item.nome === novaTarefa.value)) {
        tarefas.value.push({
          id: Math.max(...tarefas.value.map((item) => item.id)) + 1,
          nome: novaTarefa.value,
          status: 'pendente',
        })
        novaTarefa.value = ''
      } else {
        erro.value = true
        setTimeout(() => {
          erro.value = false
        }, 1500)
        novaTarefa.value = ''
      }
      break
    }
    case 'deletar': {
      tarefas.value.splice(
        tarefas.value.findIndex((item) => item.id === posicaoTarefa),
        1,
      )
      break
    }
    case 'marcar': {
      // Melhorar isso (obs: me sinto um macaco)
      if (
        tarefas.value[tarefas.value.findIndex((item) => item.id === posicaoTarefa)].status ===
        'pendente'
      )
        tarefas.value[tarefas.value.findIndex((item) => item.id === posicaoTarefa)].status =
          'concluido'
      else
        tarefas.value[tarefas.value.findIndex((item) => item.id === posicaoTarefa)].status =
          'pendente'
      break
    }
    case 'editar': {
      tarefas.value[tarefas.value.findIndex((item) => item.id === posicaoTarefa)].nome = tarefaNome
      break
    }
    case 'salvar': {
      const index = tarefas.value.findIndex((item) => item.id === editId.value)
      if (index !== -1 && novoNome.value.trim()) {
        tarefas.value[index].nome = novoNome.value.trim()
      }

      editando.value = false
      editId.value = null
      novoNome.value = ''
      break
    }
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
          @keyup.enter="manipular('adicionar')"
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
        <div class="procurar">
          <h2>Procurar</h2>
          <input v-model="procurar" type="text" title="✏️ Procure por uma tarefa" />
        </div>
        <div class="header-tarefas">
          <p>Nome</p>
          <p>Estado</p>
          <p>Ações</p>
        </div>
        <div class="tarefas">
          <div v-for="tarefa in !procurar ? tarefas : tarefasFiltradas" :key="tarefa.id">
            <div v-if="tarefasFiltradas.length !== 0" class="tarefa">
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
                  @click="manipular('marcar', tarefa.id)"
                  class="btn-toggle"
                  :title="
                    tarefa.status === 'pendente' ? 'Marcar como concluída' : 'Marcar como pendente'
                  "
                >
                  {{ tarefa.status === 'pendente' ? '✓' : '↻' }}
                </button>
                <button
                  @click="manipular('deletar', tarefa.id)"
                  class="btn-remover"
                  title="Remover tarefa"
                >
                  🗑️
                </button>
                <button
                  @click="
                    ((editando = true),
                    (editName = tarefa.nome),
                    (novoNome = tarefa.nome),
                    (editId = tarefa.id))
                  "
                >
                  ✏️
                </button>
                <div v-if="editando" class="editar">
                  <div class="modal-content">
                    <h2>Editar Tarefa</h2>
                    <p>
                      Nome atual: <strong>{{ editName }}</strong>
                    </p>

                    <input
                      v-model="novoNome"
                      type="text"
                      placeholder="Novo nome da tarefa"
                      @keyup.enter="manipular('salvar')"
                    />

                    <div class="botoes">
                      <button @click="editando = false" class="cancelar">Cancelar</button>
                      <button @click="manipular('salvar')" class="salvar">Salvar Alterações</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="tarefa">
              <div class="nome">
                <p>Tarefa Inexistente, tente criar uma tarefa</p>
              </div>
              <div class="status">
                <p :class="tarefa.status">null</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* O container que faz o fundo (Overlay) */
.editar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Background mais suave e menos "pesado" */
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

/* O cartão branco centralizado */
.modal-content {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  width: 90%;
  max-width: 420px;
  /* Sombra mais suave para combinar com o fundo */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.6rem;
}

.modal-content p {
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.modal-content input {
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1.5rem;
  border: 2px solid #f0f2f5;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  background: #f8f9fa;
  transition: border-color 0.2s;
}

.modal-content input:focus {
  outline: none;
  border-color: #3498db;
  background: white;
}

.modal-content .botoes {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Botões específicos do modal */
.modal-content button {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.cancelar {
  background: #f1f2f6 !important;
  color: #57606f !important;
}

.cancelar:hover {
  background: #dfe4ea !important;
}

.salvar {
  background: #27ae60 !important;
  color: white !important;
}

.salvar:hover {
  background: #219150 !important;
}

.procurar {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.2rem;
  background-color: #34495e;

  h2 {
    color: white;
    font-size: larger;
    font-weight: bolder;
  }

  input {
    padding: 0.8rem 1.2rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
  }
}

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
