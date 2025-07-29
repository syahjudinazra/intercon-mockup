<script setup>
import { ref, reactive, computed, nextTick } from 'vue'

// Modal visibility
const visibleLiveDemo = ref(false)
const visibleLiveDemo2 = ref(false)

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
    tanggalSelesai: '2025-07-25',
    keterangan: 'Proyek pemerintah daerah',
  },
  {
    id: 2,
    tanggalMulai: '2025-07-11',
    nama: 'Pembangunan jembatan',
    biaya: 'Rp. 30.000.000,00',
    tanggalSelesai: '2025-07-20',
    keterangan: 'Jembatan penghubung desa',
  },
  {
    id: 3,
    tanggalMulai: '2025-07-12',
    nama: 'Perbaikan pagar',
    biaya: 'Rp. 5.000.000,00',
    tanggalSelesai: '2025-07-16',
    keterangan: 'Sekolah dasar negeri',
  },
])

// Form data proyek
const form = reactive({
  tanggalMulai: '',
  nama: '',
  biaya: '',
  tanggalSelesai: '',
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
  form.tanggalSelesai = ''
  form.keterangan = ''
  isEditMode.value = false
  selectedIndex.value = null
}

// Hapus proyek
const toBeDeletedIndex = ref(null)

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
        <th scope="col">Tanggal Selesai</th>
        <th scope="col">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(project, index) in filteredProjects" :key="project.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ project.tanggalMulai }}</td>
        <td>{{ project.nama }}</td>
        <td>{{ project.biaya }}</td>
        <td>{{ project.tanggalSelesai }}</td>
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
                <a href="#" class="text-decoration-none">Download PDF</a>
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
          type="date"
          id="tanggal-selesai"
          label="Tanggal selesai"
          placeholder="Masukan tanggal selesai"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CFormTextarea
        id="exampleFormControlTextarea1"
        label="Keterangan"
        placeholder="Deskripsi, alamat, dsb"
        rows="3"
      ></CFormTextarea>
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
