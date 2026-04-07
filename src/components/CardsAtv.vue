<script setup>
let props = defineProps({
  id: Number,
  name: String,
  state: Boolean,
})

let emit = defineEmits(['acao'])

function handleActions(type){
  emit('acao', {type, id: props.id, name: props.name})
}

</script>

<template>
  <div class="task">
    <div class="name">
      <p>{{ props.name }}</p>
    </div>
    <div class="state">
      <p :class="props.state ? 'completed' : 'pending'">
        {{ props.state ? 'completed' : 'pending' }}
      </p>
    </div>
    <div class="actions">
      <button class="action-btn" @click="handleActions('complete')" title="complete">✔️</button>
      <button class="action-btn" @click="handleActions('delete')" title="delete">🗑️</button>
      <button class="action-btn" @click="handleActions('update')" title="update">✏️</button>
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
}

.task:hover {
  background: #f8f9fa;
}

.task:last-child {
  border-bottom: none;
}

.name p {
  margin: 0;
  text-align: left;
  color: #2c3e50;
  font-weight: 500;
  line-height: 1.4;
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
  gap: 1rem;
  .action-btn {
    padding: 0.8rem;
    background-color: white;
    border: none;
    box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.31);
    border-radius: 30px;
  }
}
</style>
