import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeApp.vue'),
    },
    {
      path: '/atividade-contador',
      name: 'NomeIdentificação',
      component: () => import('@/views/Atividades/AtividadeContador.vue'),
    },
  ],
})

export default router
