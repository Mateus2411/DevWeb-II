<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import FooterComp from '@/components/FooterComp.vue'
</script>

<template>
  <div class="app-wrapper">
    <HeaderComp />
    <main class="main-content">
      <router-view />
    </main>
    <FooterComp />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
