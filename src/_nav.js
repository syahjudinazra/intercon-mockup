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
    icon: 'cil-institution',
    items: [
      {
        component: 'CNavItem',
        name: 'Proyek',
        to: '/uang-masuk/proyek',
        icon: 'cil-pencil',
      },
      {
        component: 'CNavGroup',
        name: 'Bangunan',
        to: '/uang-masuk/bangunan',
        icon: 'cil-puzzle',

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
        icon: 'cil-cursor',

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
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Uang Keluar',
    to: '/uang-keluar',
    icon: 'cil-exit-to-app',
    items: [
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
    name: 'Lainya',
  },
  {
    component: 'CNavItem',
    name: 'Komplain',
    to: '/komplain',
    icon: 'cil-notes',
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
    icon: 'cil-star',
  },
]
