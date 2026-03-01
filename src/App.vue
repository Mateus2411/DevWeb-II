<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import FooterComp from '@/components/FooterComp.vue'
</script>

<template>
  <div>
    <HeaderComp />
      <router-view />
    <FooterComp />
  </div>
</template>

<style scoped></style>
