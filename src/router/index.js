import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeApp.vue'),
    },

    // #region Aulas
      {
        path: '/aulaprops',
        name: 'Aula Props',
        component: () => import('@/views/Atividades/AtvFenTar.vue'),
      },
    // #endregion

    // #region Atividades
      {
        path: '/atividade-contador',
        name: 'NomeIdentificação',
        component: () => import('@/views/Atividades/AtividadeContador.vue'),
      },
      {
        path: '/atividade-tarefas',
        name: 'Gerenciador De Tarefas',
        component: () => import('@/views/Atividades/AtividadeGerenciadorTarefas.vue'),
      },

    // #endregion

  ],
})

export default router
