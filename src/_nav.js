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
    component: 'CNavGroup',
    name: 'Uang Masuk',
    to: '/uang-masuk',
    icon: 'cil-money',
    items: [
      {
        component: 'CNavItem',
        name: 'Proyek',
        to: '/uang-masuk/proyek',
        icon: 'cil-share-alt',
      },
      {
        component: 'CNavGroup',
        name: 'Bangunan',
        to: '/uang-masuk/bangunan',
        icon: 'cil-institution',
        items: [
          {
            component: 'CNavItem',
            name: 'Bangunan Baru',
            to: '/uang-masuk/bangunan/bangunan-baru',
          },
          {
            component: 'CNavItem',
            name: 'Bangunan Renovasi',
            to: '/uang-masuk/bangunan/bangunan-renovasi',
          },
          {
            component: 'CNavItem',
            name: 'Lain Lain',
            to: '/uang-masuk/bangunan/lain-lain',
          },
        ],
      },
      {
        component: 'CNavGroup',
        name: 'Assets',
        to: '/uang-masuk/assets',
        icon: 'cil-storage',
        items: [
          {
            component: 'CNavItem',
            name: 'Estimasi',
            to: '/uang-masuk/assets/estimasi',
          },
          {
            component: 'CNavItem',
            name: 'Jual Asset',
            to: '/uang-masuk/assets/jual-asset',
          },
          {
            component: 'CNavItem',
            name: 'Jual Kartu',
            to: '/uang-masuk/assets/jual-kartu',
          },
        ],
      },
      {
        component: 'CNavGroup',
        name: 'Operasional',
        to: '/uang-masuk/operasional',
        icon: 'cil-people',
        items: [
          {
            component: 'CNavItem',
            name: 'Uang Masuk',
            to: '/uang-masuk/operasional',
          },
        ],
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Uang Keluar',
    to: '/uang-keluar',
    icon: 'cil-exit-to-app',
    items: [
      {
        component: 'CNavGroup',
        name: 'Operasional',
        to: '/uang-keluar/operasional',
        icon: 'cil-people',
        items: [
          {
            component: 'CNavItem',
            name: 'Uang Keluar',
            to: '/uang-keluar/operasional',
          },
        ],
      },
      {
        component: 'CNavItem',
        name: 'Deposito',
        to: '/uang-keluar/deposito',
        icon: 'cil-chart-pie',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Biaya Lainnya',
    to: '/biaya-lainnya',
    icon: 'cil-notes',
  },
  {
    component: 'CNavTitle',
    name: 'Lainnya',
  },
  {
    component: 'CNavItem',
    name: 'Komplain',
    to: '/komplain',
    icon: 'cil-comment-square',
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
    name: 'Data Warga',
    to: '/data-warga',
    icon: 'cil-people',
  },
]
