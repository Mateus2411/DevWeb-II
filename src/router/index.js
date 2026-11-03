import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from '@/views/HomeApp.vue'
import AtividadeContador from '@/views/Atividades/AtividadeContador.vue'
import AtvFenTar from '@/views/Atividades/AtvFenTar.vue'
import AtvProdutos from '@/views/Atividades/AtvProdutos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeApp,
    },
    {
      path: '/atividade-contador',
      name: 'NomeIdentificação',
      component: AtividadeContador,
    },
    {
      path: '/atividade-tarefas',
      name: 'Gerenciador De Tarefas',
      component: AtvFenTar,
    },
    {
      path: '/atv-produtos',
      name: 'produtos',
      component: AtvProdutos,
      children: [
        {
        path: 'alimentos',
        name: 'alimentos',
        component: () => import('@/views/NomeArquivo'),
        meta: {
        // hideHeader: true,
        // hideFooter: true,
        // requiresAuth: true,
        },
        },
      ]
    },
  ],
})

export default router
