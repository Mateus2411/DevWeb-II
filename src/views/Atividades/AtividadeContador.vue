<script setup>
import { ref } from 'vue'

const contador = ref(0)
const valor = ref(1)
const mensagem = ref('')

function manipular(acao) {
  mensagem.value = ''

  if (acao === 'aumentar') {
    contador.value += Number(valor.value)

    if (contador.value >= 10) {
      contador.value = 10
      mensagem.value = 'Você atingiu o valor máximo (10)'
    }
  } else if (acao === 'diminuir') {
    contador.value -= Number(valor.value)

    if (contador.value <= 0) {
      contador.value = 0
      mensagem.value = 'Você atingiu o valor mínimo (0)'
    }
  }
}
</script>

<template>
  <section>
    <div class="display">
      <div id="escrita">Contador:</div>
      <div id="contador">{{ contador }}</div>
    </div>
    <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
    <div class="btn">
      <button :disabled="contador >= 10" id="aumentar" @click="manipular('aumentar')">
        Aumentar contador
      </button>
      <button :disabled="contador <= 0" id="diminuir" @click="manipular('diminuir')">
        Diminuir contador
      </button>
    </div>
    <div id="incrementar">
      <label>Incremento:</label>
      <input
        type="number"
        min="1"
        max="10"
        v-model.number="valor"
        @input="valor = Math.abs(valor); if (valor > 10) valor = 10; if (valor < 1) valor = 1"
      />
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  min-height: 60vh;
}

.display {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#escrita {
  font-size: 2rem;
  font-weight: 500;
  color: #2d3436;
  margin-bottom: 1rem;
}
.mensagem {
  margin-top: 1rem;
  font-weight: 600;
  color: #e17055;
}

#contador {
  font-size: 5rem;
  font-weight: 700;
  color: #2d3436;
}

.btn {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 1rem 0;
}

button {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #a29bfe 0%, #74b9ff 100%);
  color: white;
  transition: all 0.3s;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(162, 155, 254, 0.4);
}

button:disabled {
  background: #dfe6e9;
  cursor: not-allowed;
  opacity: 0.6;
}

#incrementar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

#incrementar label {
  font-size: 1rem;
  color: #2d3436;
  font-weight: 500;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
  border: 2px solid #dfe6e9;
  border-radius: 8px;
  width: 80px;
  background-color: white;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: #a29bfe;
  box-shadow: 0 0 0 3px rgba(162, 155, 254, 0.1);
}
</style>
