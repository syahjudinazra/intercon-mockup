export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavTitle',
    name: 'Manajemen',
  },
  {
    component: 'CNavItem',
    name: 'Proyek',
    to: '/proyek',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavGroup',
    name: 'Operasional',
    to: '/operasional',
    icon: 'cil-drop',
    items: [
      {
        component: 'CNavItem',
        name: 'Uang Masuk',
        to: '/operasional/uang-masuk',
      },
      {
        component: 'CNavItem',
        name: 'Uang Keluar',
        to: '/operasional/uang-keluar',
      },
    ],
  },
  {
    component: 'CNavTitle',
    name: 'Internal',
  },
  {
    component: 'CNavGroup',
    name: 'Bangunan',
    to: '/bangunan',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Bangunan Baru',
        to: '/bangunan/bangunan-baru',
      },
      {
        component: 'CNavItem',
        name: 'Bangunan Renovasi',
        to: '/bangunan/bangunan-renovasi',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Assets',
    to: '/assets',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Estimasi',
        to: '/assets/estimasi',
      },
      {
        component: 'CNavItem',
        name: 'Penyusutan',
        to: '/assets/penyusutan',
      },
      {
        component: 'CNavItem',
        name: 'Jual Asset',
        to: '/assets/jual-asset',
      },
      {
        component: 'CNavItem',
        name: 'Jual Kartu',
        to: '/assets/jual-kartu',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Komplain',
    to: '/komplain',
    icon: 'cil-notes',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Deposito',
    to: '/deposito',
    icon: 'cil-chart-pie',
  },
  {
    component: 'CNavTitle',
    name: 'Users',
  },
  {
    component: 'CNavItem',
    name: 'Kelola Users',
    to: '/kelola-users',
    icon: 'cil-user',
  },
  {
    component: 'CNavItem',
    name: 'Semua Aktivitas',
    to: '/semua-aktivitas',
    icon: 'cil-star',
  },
]
