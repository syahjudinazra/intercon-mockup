<template>
  <div class="financial-dashboard">
    <!-- Dashboard Stats Section -->
    <div class="row mb-4">
      <div class="col-12 mb-3">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h3 class="card-title">Total Saldo Rekening</h3>
                <h2>{{ formatCurrency(totalBalance) }}</h2>
              </div>
              <div class="text-end">
                <span class="badge bg-light text-dark fs-6">
                  {{ balanceChangePercentage }}%
                  {{ balanceChangePercentage >= 0 ? '↑' : '↓' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5>Uang Masuk Bulan Ini</h5>
            <h4>{{ formatCurrency(monthlyIncome) }}</h4>
            <small>{{ incomingMoney.length }} transaksi</small>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <div class="card bg-danger text-white">
          <div class="card-body">
            <h5>Uang Keluar Bulan Ini</h5>
            <h4>{{ formatCurrency(monthlyExpense) }}</h4>
            <small>5 transaksi</small>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <div class="card bg-warning text-white">
          <div class="card-body">
            <h5>Uang Masuk Hari Ini</h5>
            <h4>{{ formatCurrency(dailyIncome) }}</h4>
            <small>{{ dailyIncomeCount }} transaksi</small>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-3">
        <div class="card bg-info text-white">
          <div class="card-body">
            <h5>Uang Keluar Hari Ini</h5>
            <h4>{{ formatCurrency(dailyExpense) }}</h4>
            <small>{{ dailyExpenseCount }} transaksi</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Income Management Section -->
    <div class="card">
      <div class="card-header">
        <h2 class="mb-0">Riwayat Pembayaran</h2>
      </div>
      <div class="card-body">
        <!-- Search and Filter Controls -->
        <div class="row mb-3">
          <!-- Search Input -->
          <div class="col-md-4">
            <label class="form-label small text-muted">Search</label>

            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Cari berdasarkan kategori, keterangan, atau nominal..."
                v-model="searchTerm"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="clearSearch"
                v-if="searchTerm"
              ></button>
            </div>
          </div>

          <!-- Date Range Filter -->
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-5">
                <label class="form-label small text-muted">Dari Tanggal</label>
                <input type="date" class="form-control" v-model="dateRange.start" />
              </div>
              <div class="col-md-5">
                <label class="form-label small text-muted">Sampai Tanggal</label>
                <input type="date" class="form-control" v-model="dateRange.end" />
              </div>
              <div class="col-md-2 d-flex align-items-end">
                <button
                  class="btn btn-outline-danger w-100"
                  type="button"
                  @click="clearDateFilter"
                  v-if="dateRange.start || dateRange.end"
                  title="Hapus Filter Tanggal"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Date Filter Buttons -->
          <div class="col-md-2">
            <label class="form-label small text-muted">Filter Cepat</label>
            <div class="btn-group-vertical w-100" role="group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="setDateFilter('today')"
              >
                Hari Ini
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="setDateFilter('thisWeek')"
              >
                Minggu Ini
              </button>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="setDateFilter('thisMonth')"
              >
                Bulan Ini
              </button>
            </div>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div class="row mb-3" v-if="searchTerm || dateRange.start || dateRange.end">
          <div class="col-12">
            <div class="d-flex flex-wrap gap-2 align-items-center">
              <span class="text-muted small">Filter aktif:</span>

              <span v-if="searchTerm" class="badge bg-info">
                Pencarian: "{{ searchTerm }}"
                <button
                  type="button"
                  class="btn-close btn-close-white ms-1"
                  style="font-size: 0.6em"
                  @click="clearSearch"
                ></button>
              </span>

              <span v-if="dateRange.start || dateRange.end" class="badge bg-success">
                Tanggal: {{ formatDateRange() }}
                <button
                  type="button"
                  class="btn-close btn-close-white ms-1"
                  style="font-size: 0.6em"
                  @click="clearDateFilter"
                ></button>
              </span>

              <button class="btn btn-outline-secondary btn-sm" @click="clearAllFilters">
                Hapus Semua Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Data Table -->
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead class="table-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Tanggal Masuk</th>
                <th scope="col">Kategori</th>
                <th scope="col">Nominal</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Bukti Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedData" :key="item.id">
                <th scope="row">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
                <td>{{ formatDate(item.date) }}</td>
                <td>
                  <span class="badge bg-secondary">{{ item.category }}</span>
                </td>
                <td class="text-success fw-bold">{{ formatCurrency(item.amount) }}</td>
                <td>{{ item.description }}</td>
                <td>
                  <div class="d-flex gap-2">
                    <a href="#" class="text-decoration-none" @click="viewItem(item)">Lihat</a>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredIncomingMoney.length === 0">
                <td colspan="6" class="text-center text-muted py-4">
                  <i class="bi bi-inbox fs-1"></i>
                  <p class="mb-0" v-if="searchTerm || dateRange.start || dateRange.end">
                    Tidak ada data yang cocok dengan filter yang diterapkan
                  </p>
                  <p class="mb-0" v-else>Tidak ada data yang ditemukan</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          class="d-flex justify-content-between align-items-center mt-3"
          v-if="filteredIncomingMoney.length > 0"
        >
          <div>
            <span class="text-muted">
              Menampilkan {{ startIndex + 1 }}-{{
                Math.min(endIndex, filteredIncomingMoney.length)
              }}
              dari {{ filteredIncomingMoney.length }} data
              <span
                v-if="
                  (searchTerm || dateRange.start || dateRange.end) &&
                  filteredIncomingMoney.length !== incomingMoney.length
                "
              >
                (difilter dari {{ incomingMoney.length }} total data)
              </span>
            </span>
          </div>
          <nav v-if="totalPages > 1">
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">&laquo;</a>
              </li>
              <li
                class="page-item"
                :class="{ active: page === currentPage }"
                v-for="page in visiblePages"
                :key="page"
              >
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">&raquo;</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Reactive data
const incomingMoney = ref([])
const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5) // Items per page

// Date range filter
const dateRange = ref({
  start: '',
  end: '',
})

// Initial account balance (before any transactions)
const initialBalance = ref(498000000) // Rp. 498.000.000,00
const monthlyExpense = ref(1500000) // Fixed monthly expense
const dailyExpense = ref(1800000) // Fixed daily expense

// Initialize sample data
onMounted(() => {
  incomingMoney.value = [
    {
      id: 1,
      date: '2025-07-18',
      category: 'Uang Masuk',
      amount: 250000,
      description:
        'Saya telah membayar iuran bulan Juli 2025, dan sudah melampirkan bukti pembayaran.',
    },
    {
      id: 2,
      date: '2025-07-11',
      category: 'Uang Masuk',
      amount: 500000,
      description:
        'Saya telah membayar iuran lingkungan bulan Juli 2025, dan sudah melampirkan bukti pembayaran.',
    },
    {
      id: 3,
      date: '2025-07-20',
      category: 'Uang Keluar',
      amount: 300000,
      description: 'Pembayaran iuran keamanan bulan Juli 2025.',
    },
    {
      id: 4,
      date: '2025-07-22',
      category: 'Bangunan Baru',
      amount: 150000,
      description: 'Pak asep telah membayar iuran pembangunan gedung baru.',
    },
    {
      id: 5,
      date: '2025-07-15',
      category: 'Jual Asset',
      amount: 250000,
      description: 'Jual motor dari harga penyusutan',
    },
    // Add more sample data for pagination demo
    {
      id: 6,
      date: '2025-07-14',
      category: 'Uang Masuk',
      amount: 175000,
      description: 'Pembayaran iuran kebersihan bulan Juli 2025.',
    },
    {
      id: 7,
      date: '2025-07-13',
      category: 'Bangunan Renovasi',
      amount: 450000,
      description: 'Biaya renovasi fasilitas umum lingkungan.',
    },
    {
      id: 8,
      date: '2025-07-12',
      category: 'Uang Masuk',
      amount: 200000,
      description: 'Iuran bulanan dari warga RT 03.',
    },
    // Add more data for better testing
    {
      id: 9,
      date: '2025-06-28',
      category: 'Uang Masuk',
      amount: 300000,
      description: 'Pembayaran iuran bulan Juni 2025.',
    },
    {
      id: 10,
      date: '2025-07-29',
      category: 'Uang Masuk',
      amount: 180000,
      description: 'Pembayaran iuran hari ini.',
    },
  ]
})

// Computed properties for dashboard stats
const totalIncome = computed(() => {
  return incomingMoney.value.reduce((sum, item) => sum + item.amount, 0)
})

const totalBalance = computed(() => {
  return initialBalance.value + totalIncome.value - monthlyExpense.value
})

const monthlyIncome = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return incomingMoney.value
    .filter((item) => {
      const itemDate = new Date(item.date)
      return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear
    })
    .reduce((sum, item) => sum + item.amount, 0)
})

const dailyIncome = computed(() => {
  const now = new Date()
  const currentDate = now.getDate()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return incomingMoney.value
    .filter((item) => {
      const itemDate = new Date(item.date)
      return (
        itemDate.getDate() === currentDate &&
        itemDate.getMonth() === currentMonth &&
        itemDate.getFullYear() === currentYear
      )
    })
    .reduce((sum, item) => sum + item.amount, 0)
})

const dailyIncomeCount = computed(() => {
  const now = new Date()
  const currentDate = now.getDate()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return incomingMoney.value.filter((item) => {
    const itemDate = new Date(item.date)
    return (
      itemDate.getDate() === currentDate &&
      itemDate.getMonth() === currentMonth &&
      itemDate.getFullYear() === currentYear
    )
  }).length
})

const balanceChangePercentage = computed(() => {
  const change = ((totalBalance.value - initialBalance.value) / initialBalance.value) * 100
  return change.toFixed(1)
})

// Filter data based on search term and date range
const filteredIncomingMoney = computed(() => {
  let filtered = incomingMoney.value

  // Apply search filter
  if (searchTerm.value.trim()) {
    const term = searchTerm.value.toLowerCase().trim()
    filtered = filtered.filter(
      (item) =>
        item.category.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        formatCurrency(item.amount).toLowerCase().includes(term) ||
        formatDate(item.date).includes(term),
    )
  }

  // Apply date range filter
  if (dateRange.value.start || dateRange.value.end) {
    filtered = filtered.filter((item) => {
      const itemDate = new Date(item.date)
      const startDate = dateRange.value.start ? new Date(dateRange.value.start) : null
      const endDate = dateRange.value.end ? new Date(dateRange.value.end) : null

      // Set time to beginning/end of day for proper comparison
      if (startDate) startDate.setHours(0, 0, 0, 0)
      if (endDate) endDate.setHours(23, 59, 59, 999)
      itemDate.setHours(0, 0, 0, 0)

      let withinRange = true

      if (startDate && itemDate < startDate) {
        withinRange = false
      }

      if (endDate && itemDate > endDate) {
        withinRange = false
      }

      return withinRange
    })
  }

  return filtered
})

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(filteredIncomingMoney.value.length / itemsPerPage.value)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value
})

const paginatedData = computed(() => {
  return filteredIncomingMoney.value.slice(startIndex.value, endIndex.value)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages.filter((page) => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
})

// Watch for changes and reset pagination
watch(
  [searchTerm, dateRange],
  () => {
    currentPage.value = 1
  },
  { deep: true },
)

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('IDR', 'Rp')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatDateRange = () => {
  const start = dateRange.value.start
  const end = dateRange.value.end

  if (start && end) {
    return `${formatDate(start)} - ${formatDate(end)}`
  } else if (start) {
    return `Dari ${formatDate(start)}`
  } else if (end) {
    return `Sampai ${formatDate(end)}`
  }
  return ''
}

const clearSearch = () => {
  searchTerm.value = ''
}

const clearDateFilter = () => {
  dateRange.value.start = ''
  dateRange.value.end = ''
}

const clearAllFilters = () => {
  searchTerm.value = ''
  dateRange.value.start = ''
  dateRange.value.end = ''
}

const setDateFilter = (period) => {
  const now = new Date()

  switch (period) {
    case 'today':
      const today = now.toISOString().split('T')[0]
      dateRange.value.start = today
      dateRange.value.end = today
      break

    case 'thisWeek':
      const startOfWeek = new Date(now)
      const dayOfWeek = now.getDay()
      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Monday as start of week
      startOfWeek.setDate(now.getDate() - daysToSubtract)

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      dateRange.value.start = startOfWeek.toISOString().split('T')[0]
      dateRange.value.end = endOfWeek.toISOString().split('T')[0]
      break

    case 'thisMonth':
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

      dateRange.value.start = startOfMonth.toISOString().split('T')[0]
      dateRange.value.end = endOfMonth.toISOString().split('T')[0]
      break
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const viewItem = (item) => {
  // Handle view item logic here
  console.log('Viewing item:', item)
}
</script>

<style scoped>
.financial-dashboard {
  margin: 0 auto;
}

.modal {
  background: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block !important;
}

.table th {
  background-color: #343a40;
  color: white;
  border-color: #454d55;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.badge {
  font-size: 0.75em;
}

.btn {
  border-radius: 0.375rem;
}

.btn-group .dropdown-toggle::after {
  margin-left: 0.5em;
}

@media (max-width: 768px) {
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }

  .utility-table {
    flex-wrap: wrap;
  }

  .input-group {
    max-width: 100% !important;
  }
}
</style>
