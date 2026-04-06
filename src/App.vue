<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import FooterComp from '@/components/FooterComp.vue'
</script>

<template>
  <div class="app-wrapper">
    <HeaderComp />
    <main>
      <router-view />
    </main>
    <FooterComp class="footer" />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  padding: 2rem;
}

.footer {
  margin-top: auto;
}
</style>
