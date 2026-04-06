<script setup>
import { ref } from 'vue'

const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}
</script>

<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">DevWeb II</router-link>

      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>

        <div class="dropdown">
          <span class="nav-link" @click="toggleDropdown">Atividades</span>

          <div v-if="showDropdown" class="dropdown-menu">
            <router-link to="/atividade-contador" class="dropdown-item" @click="closeDropdown">Contador</router-link>
            <router-link to="/atividade-tarefas" class="dropdown-item" @click="closeDropdown">Gen.Tarefas</router-link>
            <router-link to="/aulaprops" class="dropdown-item" @click="closeDropdown">Atividade Props</router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 1.25rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3436;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #636e72;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  cursor: pointer;
}

.nav-link:hover {
  color: #2d3436;
}

.nav-link.router-link-active {
  color: #2d3436;
  font-weight: 500;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  min-width: 150px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 0.25rem 0;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #636e72;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #2d3436;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .nav {
    gap: 1.5rem;
  }
}
</style>
