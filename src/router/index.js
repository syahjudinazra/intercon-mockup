import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: 'uang-masuk',
        name: 'UangMasuk',
        redirect: '/uang-masuk/proyek',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'operasional',
            name: 'UangMasukOperasional',
            component: { render: () => h(resolveComponent('router-view')) },
            children: [
              {
                path: '',
                name: 'Uang Masuk',
                component: () => import('@/views/uang-masuk/operasional/UangMasuk.vue'),
              },
            ],
          },
          {
            path: 'proyek',
            name: 'Proyek',
            component: () => import('@/views/uang-masuk/Proyek.vue'),
          },
          {
            path: 'bangunan',
            name: 'Bangunan',
            component: { render: () => h(resolveComponent('router-view')) },
            children: [
              {
                path: 'bangunan-baru',
                name: 'BangunanBaru',
                component: () => import('@/views/uang-masuk/bangunan/BangunanBaru.vue'),
              },
              {
                path: 'bangunan-renovasi',
                name: 'BangunanRenovasi',
                component: () => import('@/views/uang-masuk/bangunan/BangunanRenovasi.vue'),
              },
              {
                path: 'lain-lain',
                name: 'BangunanLainLain',
                component: () => import('@/views/uang-masuk/bangunan/LainLain.vue'),
              },
            ],
          },
          {
            path: 'assets',
            name: 'Assets',
            component: { render: () => h(resolveComponent('router-view')) },
            children: [
              {
                path: 'estimasi',
                name: 'Estimasi',
                component: () => import('@/views/uang-masuk/assets/Estimasi.vue'),
              },
              {
                path: 'jual-asset',
                name: 'JualAsset',
                component: () => import('@/views/uang-masuk/assets/JualAsset.vue'),
              },
              {
                path: 'jual-kartu',
                name: 'JualKartu',
                component: () => import('@/views/uang-masuk/assets/JualKartu.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'uang-keluar',
        name: 'UangKeluar',
        redirect: '/uang-keluar/operasional',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'operasional',
            name: 'UangKeluarOperasional',
            component: { render: () => h(resolveComponent('router-view')) },
            children: [
              {
                path: '',
                name: 'Uang Keluar',
                component: () => import('@/views/uang-keluar/operasional/UangKeluar.vue'),
              },
            ],
          },
          {
            path: 'deposito',
            name: 'Deposito',
            component: () => import('@/views/uang-keluar/Deposito.vue'),
          },
        ],
      },
      {
        path: 'biaya-lainnya',
        name: 'Biaya Lainnya',
        component: () => import('@/views/BiayaLainnya.vue'),
      },
      {
        path: 'komplain',
        name: 'Komplain',
        component: () => import('@/views/Komplain.vue'),
      },
      {
        path: 'kelola-users',
        name: 'Kelola Users',
        component: () => import('@/views/users/KelolaUsers.vue'),
      },
      {
        path: 'data-warga',
        name: 'Data Warga',
        component: () => import('@/views/DataWarga.vue'),
      },
      {
        path: 'semua-aktivitas',
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
        component: () => import('@/views/pages/Page404.vue'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
