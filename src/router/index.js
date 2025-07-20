import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: '/proyek',
        name: 'Proyek',
        redirect: '/proyek',
      },
      {
        path: '/operasional',
        name: 'Operasional',
        component: () => import('@/views/Operasional.vue'),
      },
      {
        path: '/proyek',
        name: 'Proyek',
        component: () => import('@/views/Proyek.vue'),
      },
      {
        path: '/bangunan',
        name: 'Bangunan',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/bangunan/bangunan-baru',
        children: [
          {
            path: '/bangunan/bangunan-baru',
            name: 'Bangunan Baru',
            component: () => import('@/views/bangunan/BangunanBaru.vue'),
          },
          {
            path: '/bangunan/bangunan-renovasi',
            name: 'Bangunan Renovasi',
            component: () => import('@/views/bangunan/BangunanRenovasi.vue'),
          },
        ],
      },
      {
        path: '/assets',
        name: 'Assets',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/assets/estimasi',
        children: [
          {
            path: '/assets/estimasi',
            name: 'Estimasi',
            component: () => import('@/views/assets/Estimasi.vue'),
          },
          {
            path: '/assets/penyusutan',
            name: 'Penyusutan',
            component: () => import('@/views/assets/Penyusutan.vue'),
          },
          {
            path: '/assets/jual-asset',
            name: 'Jual Asset',
            component: () => import('@/views/assets/JualAsset.vue'),
          },
          {
            path: '/assets/jual-kartu',
            name: 'Jual Kartu',
            component: () => import('@/views/assets/JualKartu.vue'),
          },
        ],
      },
      {
        path: '/komplain',
        name: 'Komplain',
        component: () => import('@/views/Komplain.vue'),
      },
      {
        path: '/deposito',
        name: 'Deposito',
        component: () => import('@/views/Deposito.vue'),
      },
      {
        path: '/kelola-users',
        name: 'Kelola Users',
        component: () => import('@/views/users/KelolaUsers.vue'),
      },
      {
        path: '/semua-aktivitas',
        name: 'Semua Aktivitas',
        component: () => import('@/views/SemuaAktivitas.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
