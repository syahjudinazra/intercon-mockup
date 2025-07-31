<script setup>
import { ref, reactive, computed, nextTick } from 'vue'

// Modal visibility
const visibleLiveDemo = ref(false)
const visibleLiveDemo2 = ref(false)
const visibleLiveDemo3 = ref(false)

// Mode: tambah atau edit
const isEditMode = ref(false)
const selectedIndex = ref(null)

// Data proyek
const projects = ref([
  {
    id: 1,
    tanggalMulai: '2025-07-18',
    nama: 'Pembangunan Jalan',
    biaya: 'Rp. 50.000.000,00',
    pembayaranTermin1: 'Rp. 25.000.000,00',
    pembayaranTermin2: 'Rp. 25.000.000,00',
    status: 'Antrian',
    keterangan: 'Proyek pemerintah daerah',
  },
  {
    id: 2,
    tanggalMulai: '2025-07-11',
    nama: 'Pembangunan jembatan',
    biaya: 'Rp. 30.000.000,00',
    pembayaranTermin1: 'Rp. 15.000.000,00',
    pembayaranTermin2: 'Rp. 15.000.000,00',
    status: 'Diproses',
    keterangan: 'Jembatan penghubung desa',
  },
  {
    id: 3,
    tanggalMulai: '2025-07-12',
    nama: 'Perbaikan pagar',
    biaya: 'Rp. 5.000.000,00',
    pembayaranTermin1: 'Rp. 2.500.000,00',
    pembayaranTermin2: 'Rp. 2.500.000,00',
    status: 'Selesai',
    keterangan: 'Sekolah dasar negeri',
  },
])

// Form data proyek
const form = reactive({
  tanggalMulai: '',
  nama: '',
  biaya: '',
  status: '',
  keterangan: '',
})

// Filtered projects based on search
const searchQuery = ref('')
const filterStartDate = ref('')
const filterEndDate = ref('')

const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    const matchesSearch =
      project.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.keterangan.toLowerCase().includes(searchQuery.value.toLowerCase())

    const projectDate = new Date(project.tanggalMulai)
    const start = filterStartDate.value ? new Date(filterStartDate.value) : null
    const end = filterEndDate.value ? new Date(filterEndDate.value) : null

    const matchesDate = (!start || projectDate >= start) && (!end || projectDate <= end)

    return matchesSearch && matchesDate
  })
})

// Get badge class based on status
function getBadgeClass(status) {
  switch (status) {
    case 'Antrian':
      return 'badge badge-secondary text-white'
    case 'Diproses':
      return 'badge badge-primary text-white'
    case 'Selesai':
      return 'badge badge-success text-white'
    default:
      return 'badge badge-secondary text-white'
  }
}

// Simpan / Update proyek
function submitForm() {
  if (isEditMode.value && selectedIndex.value !== null) {
    projects.value[selectedIndex.value] = { ...projects.value[selectedIndex.value], ...form }
  } else {
    const newId = Date.now()
    projects.value.push({ id: newId, ...form })
  }
  resetForm()
  visibleLiveDemo.value = false
}

// Edit proyek
function editProject(index) {
  selectedIndex.value = index
  isEditMode.value = true
  Object.assign(form, projects.value[index])
  visibleLiveDemo.value = true
}

// Reset form
function resetForm() {
  form.tanggalMulai = ''
  form.nama = ''
  form.biaya = ''
  form.status = ''
  form.keterangan = ''
  isEditMode.value = false
  selectedIndex.value = null
}

// Hapus proyek
const toBeDeletedIndex = ref(null)

function addVoucher(index) {
  visibleLiveDemo3.value = true
}

function confirmDelete(index) {
  toBeDeletedIndex.value = index
  visibleLiveDemo2.value = true
}

function deleteProject() {
  if (toBeDeletedIndex.value !== null) {
    projects.value.splice(toBeDeletedIndex.value, 1)
  }
  visibleLiveDemo2.value = false
  toBeDeletedIndex.value = null
}
</script>

<template>
  <h2>Proyek</h2>
  <div class="d-flex justify-content-between gap-2 mb-3">
    <CButton color="primary" @click="visibleLiveDemo = true">Tambah Proyek</CButton>
    <div class="utility-table d-flex gap-2">
      <CButton color="danger">PDF</CButton>
      <CDropdown variant="btn-group">
        <CDropdownToggle color="success">Excel</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href="#">Export data</CDropdownItem>
          <CDropdownItem href="#">Import data</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  </div>
  <div class="mb-4 row g-3 align-items-end">
    <div class="col-md-4">
      <label class="form-label">Cari Nama / Keterangan</label>
      <input type="text" class="form-control" v-model="searchQuery" placeholder="Cari proyek..." />
    </div>

    <div class="col-md-3">
      <label class="form-label">Dari Tanggal Mulai</label>
      <input type="date" class="form-control" v-model="filterStartDate" />
    </div>

    <div class="col-md-3">
      <label class="form-label">Sampai Tanggal Mulai</label>
      <input type="date" class="form-control" v-model="filterEndDate" />
    </div>

    <div class="col-md-2">
      <button
        class="btn btn-secondary w-100"
        @click="
          () => {
            searchQuery = ''
            filterStartDate = ''
            filterEndDate = ''
          }
        "
      >
        Reset Filter
      </button>
    </div>
  </div>

  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Tanggal Mulai</th>
        <th scope="col">Nama Proyek</th>
        <th scope="col">Biaya Proyek</th>
        <th scope="col">Pembayaran Termin ke-1</th>
        <th scope="col">Pembayaran Termin ke-2</th>
        <th scope="col">Biaya Proyek</th>
        <th scope="col">Status</th>
        <th scope="col">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(project, index) in filteredProjects" :key="project.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ project.tanggalMulai }}</td>
        <td>{{ project.nama }}</td>
        <td>{{ project.biaya }}</td>
        <td>{{ project.pembayaranTermin1 }}</td>
        <td>{{ project.pembayaranTermin2 }}</td>
        <td>
          <span :class="getBadgeClass(project.status)">
            {{ project.status }}
          </span>
        </td>
        <td class="d-flex gap-2">
          <a href="#" class="text-primary text-decoration-none" @click.prevent="editProject(index)"
            >Lihat</a
          >
          <div class="btn-group dropend">
            <a
              href="#"
              class="dropdown-toggle text-decoration-none"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Lainnya
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-item">
                <a href="#" class="text-decoration-none" @click.prevent="editProject(index)"
                  >Ubah</a
                >
              </li>
              <li class="dropdown-item">
                <a href="#" class="text-decoration-none" @click.prevent="addVoucher(index)"
                  >Tambah Voucher</a
                >
              </li>
              <li class="dropdown-item">
                <a href="#" class="text-decoration-none">Approval Proyek</a>
              </li>
              <li class="dropdown-item">
                <a href="#" class="text-decoration-none" @click.prevent="confirmDelete(index)"
                  >Hapus</a
                >
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="footer-table d-flex justify-content-between">
    <div>
      <span>Menampilkan 1-3 dari 3 data</span>
    </div>
    <div>
      <!-- Pagination -->
      <CPagination align="end" aria-label="Page navigation example">
        <CPaginationItem aria-label="Previous" href="#" disabled
          ><span aria-hidden="true">&laquo;</span></CPaginationItem
        >
        <CPaginationItem href="#" active>1</CPaginationItem>
        <CPaginationItem href="#">2</CPaginationItem>
        <CPaginationItem href="#">3</CPaginationItem>
        <CPaginationItem aria-label="Next" href="#"
          ><span aria-hidden="true">&raquo;</span></CPaginationItem
        >
      </CPagination>
    </div>
  </div>
  <!-- Modal -->
  <CModal
    :visible="visibleLiveDemo"
    @close="
      () => {
        visibleLiveDemo = false
      }
    "
    aria-labelledby="LiveDemoExampleLabel"
  >
    <CModalHeader>
      <CModalTitle id="LiveDemoExampleLabel">Tambah Proyek</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="mb-3">
        <CFormInput
          type="date"
          id="tanggal-mulai"
          label="Tanggal mulai"
          placeholder="Masukan tanggal mulai"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="text"
          id="nama-proyek"
          label="Nama Proyek"
          placeholder="Masukan nama proyek"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="text"
          id="biaya-proyek"
          label="Biaya Proyek"
          placeholder="Masukan biaya proyek"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="text"
          id="pembayaran-termin1"
          label="Pembayaran Termin ke-1"
          placeholder="Masukan pembayaran termin ke-1"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="text"
          id="pembayaran-termin2"
          label="Pembayaran Termin ke-2"
          placeholder="Masukan pembayaran termin ke-2"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="date"
          id="tanggal-selesai"
          label="Tanggal selesai"
          placeholder="Masukan tanggal selesai"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CFormTextarea
        id="exampleFormControlTextarea1"
        class="mb-3"
        label="Keterangan"
        placeholder="Deskripsi, alamat, dsb"
        rows="3"
      ></CFormTextarea>
      <CFormSelect
        class="mb-3"
        id="exampleFormControlSelect1"
        label="Pilih status"
        :options="[
          { label: 'Pilih status', value: '' },
          { label: 'Antrian', value: '1' },
          { label: 'Diproses', value: '2' },
          { label: 'Selesai', value: '3' },
        ]"
      ></CFormSelect>
      <CForm class="mb-3">
        <CFormInput
          type="file"
          id="dokumen-approval"
          label="Dokumen approval proyek"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="file"
          id="proyek-sebelum"
          label="Bukti sebelum dikerjakan"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="file"
          id="proyek-selesai"
          label="Bukti setelah selesai dikerjakan"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            visibleLiveDemo = false
          }
        "
      >
        Tutup
      </CButton>
      <CButton color="primary" @click="submitForm">
        {{ isEditMode ? 'Perbarui' : 'Simpan' }}
      </CButton>
    </CModalFooter>
  </CModal>

  <!-- Modal Voucher-->
  <CModal
    :visible="visibleLiveDemo3"
    @close="
      () => {
        visibleLiveDemo3 = false
      }
    "
    aria-labelledby="LiveDemoExampleLabel"
  >
    <CModalHeader>
      <CModalTitle id="LiveDemoExampleLabel">Tambah Voucher</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          label="Voucher"
          placeholder="Masukkan voucher"
          text="Masukan voucher untuk coret harga lama"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            visibleLiveDemo3 = false
          }
        "
      >
        Tutup
      </CButton>
      <CButton color="primary">Submit</CButton>
    </CModalFooter>
  </CModal>

  <!-- Modal Hapus-->
  <CModal
    :visible="visibleLiveDemo2"
    @close="
      () => {
        visibleLiveDemo2 = false
      }
    "
    aria-labelledby="LiveDemoExampleLabel"
  >
    <CModalHeader>
      <CModalTitle id="LiveDemoExampleLabel">Contoh peringatan hapus data</CModalTitle>
    </CModalHeader>
    <CModalBody>Apakah anda yakin ingin menghapus data ini?</CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            visibleLiveDemo2 = false
          }
        "
      >
        Tutup
      </CButton>
      <CButton color="danger" @click="deleteProject">Hapus</CButton>
    </CModalFooter>
  </CModal>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
}

.badge-secondary {
  background-color: #6c757d;
}

.badge-primary {
  background-color: #0d6efd;
}

.badge-success {
  background-color: #198754;
}

.text-white {
  color: white !important;
}
</style>
