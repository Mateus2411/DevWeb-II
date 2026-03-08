<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import FooterComp from '@/components/FooterComp.vue'
</script>

<template>
  <HeaderComp />
    <main>
      <router-view />
    </main>
  <FooterComp />
</template>

<style scoped>
</style>
