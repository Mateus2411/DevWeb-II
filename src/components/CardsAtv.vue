<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: Number,
  name: String,
  state: Boolean,
})

const emit = defineEmits(['complete', 'delete', 'update', 'save'])

const isEditing = ref(false)
const editName = ref(props.name)

function handleComplete() {
  emit('complete', props.id)
}

function handleDelete() {
  emit('delete', props.id)
}

function handleUpdate() {
  isEditing.value = true
  editName.value = props.name
}

function handleSave() {
  if (editName.value.trim()) {
    emit('save', { id: props.id, name: editName.value.trim() })
    isEditing.value = false
  }
}

function handleCancel() {
  isEditing.value = false
  editName.value = props.name
}

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    handleSave()
  } else if (e.key === 'Escape') {
    handleCancel()
  }
}
</script>

<template>
  <div class="task" :class="{ editing: isEditing }">
    <div class="name">
      <input
        v-if="isEditing"
        v-model="editName"
        type="text"
        class="edit-input"
        @keydown="handleKeyDown"
        autofocus
      />
      <p v-else>{{ props.name }}</p>
    </div>
    <div class="state">
      <p :class="props.state ? 'completed' : 'pending'">
        {{ props.state ? 'Concluído' : 'Pendente' }}
      </p>
    </div>
    <div class="actions">
      <template v-if="!isEditing">
        <button class="action-btn complete" @click="handleComplete" title="Marcar concluído">
          ✔️
        </button>
        <button class="action-btn delete" @click="handleDelete" title="Deletar">🗑️</button>
        <button class="action-btn update" @click="handleUpdate" title="Editar">✏️</button>
      </template>
      <template v-else>
        <button class="action-btn save" @click="handleSave" title="Salvar">💾</button>
        <button class="action-btn cancel" @click="handleCancel" title="Cancelar">❌</button>
      </template>
    </div>
  </div>
</template>



<style scoped>
.task {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  transition: background 0.2s;
  background: white;
}

.task:hover {
  background: #f8f9fa;
}

.task.editing {
  background: #e3f2fd;
}

.task:last-child {
  border-bottom: none;
}

.name {
  text-align: left;
}

.name p {
  margin: 0;
  color: #2c3e50;
  font-weight: 500;
  line-height: 1.4;
  word-break: break-word;
}

.edit-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 2px solid #3498db;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 500;
  color: #2c3e50;
}

.edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.state {
  display: flex;
  justify-content: center;
}

.state p {
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

.state .pending {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.state .completed {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.actions {
  border-left: 2px groove rgba(0, 0, 0, 0.274);
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.6rem 0.8rem;
  background-color: white;
  border: 2px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #3498db;
}

.action-btn:active {
  transform: translateY(0);
}

.action-btn.complete:hover {
  background: #d4edda;
  border-color: #27ae60;
}

.action-btn.delete:hover {
  background: #f8d7da;
  border-color: #e74c3c;
}

.action-btn.update:hover {
  background: #fff3cd;
  border-color: #f39c12;
}

.action-btn.save:hover {
  background: #d4edda;
  border-color: #27ae60;
}

.action-btn.cancel:hover {
  background: #f8d7da;
  border-color: #e74c3c;
}
</style>
