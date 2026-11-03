<script setup>
import {listaProdutos} from '@/stores/produtos'
import { ref } from 'vue';
const produtos = ref(listaProdutos)
produtos.value = produtos.value.filter(p => p.categoria === 'Alimentos')
</script>

<template>
  <section>

  </section>
</template>

<style scoped>

</style>
