<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const atividades = [
  {
    id: 1,
    titulo: 'Contador',
    descricao: 'Aplicação simples de contador com Vue.js',
    foto: '/ImagensAtividades/contador.png',
    rota: '/atividade-contador',
  },
]

const navegarPara = (rota) => {
  router.push(rota)
}
</script>

<template>
  <section class="cards-container">
    <div
      v-for="atividade in atividades"
      :key="atividade.id"
      class="card"
      @click="navegarPara(atividade.rota)"
    >
      <div class="card-image">
        <img
          :src="atividade.foto"
          :alt="atividade.titulo"
          @error="
            (e) =>
              (e.target.src =
                'https://via.placeholder.com/400x250/a29bfe/ffffff?text=' + atividade.titulo)
          "
        />
      </div>

      <div class="card-content">
        <h3 class="card-title">{{ atividade.titulo }}</h3>
        <p class="card-description">{{ atividade.descricao }}</p>

        <button class="card-button">Ver Atividade →</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: #a29bfe;
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #ffeaa7 0%, #dfe6e9 100%);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.1);
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3436;
  margin: 0 0 0.75rem 0;
}

.card-description {
  color: #636e72;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  min-height: 3rem;
}

.card-button {
  background: linear-gradient(135deg, #a29bfe 0%, #74b9ff 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.card-button:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(162, 155, 254, 0.4);
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }

  .card-image {
    height: 180px;
  }
}
</style>
