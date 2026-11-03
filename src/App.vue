<script setup>
import HeaderComp from '@/components/global/HeaderComp.vue'
import FooterComp from '@/components/global/FooterComp.vue'
import { useLocationStore } from '@/stores/tipoP'
import { onMounted } from 'vue'

const locationStore = useLocationStore()
onMounted(() => {
  locationStore.getLocation()
})
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
