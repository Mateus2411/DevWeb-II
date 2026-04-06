<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  type: String,
  title: String,
  description: String,
  price: Number,
  avalible: Boolean,
})
</script>

<template>
  <div class="conteiner">
    <div class="card">
      <h2 class="title">
        {{ title }}
      </h2>
      <p class="desc">
        {{ description }}
      </p>
      <p class="price">R$: {{ price }}</p>
      <p :class="avalible ? 'stock' : 'noStock'">
        {{ avalible ? 'In Stock' : 'Out of Stock' }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.conteiner {
  display: flex;
  justify-content: center;
  flex-direction: none;
  .card {
    background-color: black;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 20px;
    color: white;
    .title {
      font-size: larger;
      font-weight: 500;
    }
    .desc {
      color: #717171;
    }
    .price {
      color: white;
    }
    .stock {
      color: green;
    }
    .noStock {
      color: red;
    }
  }
}
</style>
