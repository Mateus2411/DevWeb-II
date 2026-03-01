<script setup>
import CardsAtividades from '@/components/CardsAtividades.vue'
</script>

<template>
  <section class="home">
    <div class="intro">
      <h1>Atividades DevWeb II</h1>
      <p>Repositório das atividades da disciplina</p>
    </div>

    <CardsAtividades />
  </section>
</template>

<style scoped>
.home {
  padding: 2rem 0;
}

.intro {
  text-align: center;
  padding: 2rem 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.intro h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #2d3436;
  margin: 0 0 0.75rem 0;
}

.intro p {
  font-size: 1rem;
  color: #636e72;
  margin: 0;
}

@media (max-width: 768px) {
  .intro h1 {
    font-size: 1.5rem;
  }
}
</style>
