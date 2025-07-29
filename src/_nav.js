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
        to: '/proyek',
        icon: 'cil-pencil',
      },
      {
        component: 'CNavGroup',
        name: 'Bangunan',
        to: '/manajemen/karyawan',
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
          {
            component: 'CNavItem',
            name: 'Lain Lain',
            to: '/bangunan/lain-lain',
          },
        ],
      },
      {
        component: 'CNavGroup',
        name: 'Assets',
        to: '/manajemen/karyawan',
        icon: 'cil-cursor',

        items: [
          {
            component: 'CNavItem',
            name: 'Estimasi',
            to: '/assets/estimasi',
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
        to: '/deposito',
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
