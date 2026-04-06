<script setup>
import CardsProps from '@/components/AulasComp/CardsProps.vue'
const products = [
  {
    title: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI',
    price: 29.99,
    available: true,
  },
  {
    title: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: 89.9,
    available: true,
  },
  {
    title: 'USB-C Hub',
    description: 'Multiport adapter with HDMI, USB and SD card slots',
    price: 45.5,
    available: false,
  },
  {
    title: 'Gaming Headset',
    description: 'Surround sound headset with noise cancelling microphone',
    price: 59.9,
    available: true,
  },
  {
    title: 'Laptop Stand',
    description: 'Aluminum adjustable stand for laptops up to 17 inches',
    price: 34.99,
    available: true,
  },
]
</script>

<template>
  <section>
    <CardsProps 
      v-for="(product, index) in products" 
      :key="index"
      :title="product.title"
      :description="product.description"
      :price="product.price"
      :avalible="product.available"
      />
  </section>
</template>

<style scoped>
section{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
