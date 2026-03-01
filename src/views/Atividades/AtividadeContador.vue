<script setup>
import { ref } from 'vue'
const contador = ref(0)
const valor = ref(1)

function manipular(acao) {
  if (acao === 'aumentar') {
    contador.value += Number(valor.value)
    if (contador.value > 10) contador.value = 10
  } else if (acao === 'diminuir') {
    contador.value -= Number(valor.value)
    if (contador.value < 0) contador.value = 0
  }
}
</script>

<template>
  <section>
    <div class="display">
      <div id="escrita">Contador:</div>
      <div id="contador">{{ contador }}</div>
    </div>
    <div class="btn">
      <button :disabled="contador >= 10" id="aumentar" @click="manipular('aumentar')">
        Aumentar contador
      </button>
      <button :disabled="contador <= 0" id="diminuir" @click="manipular('diminuir')">
        Diminuir contador
      </button>
    </div>
    <div id="incrementar">
      <input type="number" min="0" max="10" v-model="valor" @input="valor = Math.abs(valor); if(valor > 10) valor = 10" />
      {{ valor }}
    </div>
  </section>
</template>

<style scoped>
* {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  padding: 2.5%;
}

.display {
  padding: 2rem;

  #escrita {
    font-size: 3rem;
    font-weight: 500;
    color: rgb(0, 0, 0);
  }
  #contador {
    font-size: 5rem;
    font-weight: 700;
    color: rgb(0, 0, 0);
  }
}

.btn {
  flex-direction: row;
  gap: 1rem;
  margin: 1rem 0;
}

button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #42b883;
  color: white;
  transition: all 0.3s;
}

button:hover:not(:disabled) {
  background-color: #35a372;
  transform: scale(1.05);
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  opacity: 0.6;
}

#incrementar {
  margin-top: 2rem;
  color: white;
  font-size: 1.5rem;
  gap: 1rem;
}

input {
  padding: 0.8rem 0 0.8rem 0.8rem;
  font-size: 1.2rem;
  text-align: center;
  border: 2px solid #42b883;
  border-radius: 8px;
  width: 150px;
  background-color: white;
}

input:focus {
  outline: none;
  border-color: #35a372;
  box-shadow: 0 0 10px rgba(66, 184, 131, 0.5);
}
</style>
