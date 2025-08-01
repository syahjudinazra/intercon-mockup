<script setup>
import { ref, watch } from 'vue'

const data = [
  {
    date: '18/07/2025',
    category: 'Bangunan Cluster A',
    nominal: 'Rp. 250.000',
    coordination: 'Rp. 50.000',
    remaining: 'Rp. 200.000',
    description: 'Pembangunan baru seluas 100 meter persegi',
  },
  {
    date: '11/07/2025',
    category: 'Bangunan Cluster Mawar',
    nominal: 'Rp. 550.000',
    coordination: 'Rp. 50.000',
    remaining: 'Rp. 500.000',
    description: 'Pembangunan baru seluas 150 meter persegi',
  },
]

const showModal = ref({ coordination: false })
const selectedIndex = ref(null)
const inputCoordination = ref('')
const calculatedSisa = ref('')

const toggleModal = (type, state = true, index = null) => {
  showModal.value[type] = state
  if (type === 'coordination' && state && index !== null) {
    selectedIndex.value = index
    inputCoordination.value = ''
    calculatedSisa.value = ''
  }
}

// Watch untuk menghitung sisa
watch([inputCoordination, selectedIndex], () => {
  const nominalString = data[selectedIndex.value]?.nominal || '0'
  const nominalCleaned = parseInt(nominalString.replace(/[^0-9]/g, ''), 10)
  const coordinationAmount = parseInt(inputCoordination.value, 10) || 0

  if (nominalCleaned >= coordinationAmount) {
    const result = nominalCleaned - coordinationAmount
    calculatedSisa.value = `Rp. ${new Intl.NumberFormat('id-ID').format(result)},00`
  } else {
    calculatedSisa.value = ''
  }
})
</script>

<template>
  <h2>Bangunan Baru</h2>

  <!-- Toolbar -->
  <div class="d-flex justify-content-between gap-2 mb-3">
    <CButton color="primary" @click="toggleModal('view')">Tambah data</CButton>

    <div class="utility-table d-flex gap-2">
      <CButton color="danger">PDF</CButton>
      <CDropdown variant="btn-group">
        <CDropdownToggle color="success">Excel</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href="#">Export data</CDropdownItem>
          <CDropdownItem href="#">Import data</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <CInputGroup>
        <CFormInput placeholder="Cari..." aria-label="Cari..." />
        <CButton type="button" color="secondary" variant="outline">Search</CButton>
      </CInputGroup>
    </div>
  </div>

  <!-- Table -->
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th>No</th>
        <th>Tanggal Masuk</th>
        <th>Kategori</th>
        <th>Nominal</th>
        <th>Uang Kordinasi</th>
        <th>Sisa</th>
        <th>Keterangan</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.nominal }}</td>
        <td>{{ item.coordination }}</td>
        <td>{{ item.remaining }}</td>
        <td>{{ item.description }}</td>
        <td class="d-flex gap-2">
          <a href="#" class="text-primary text-decoration-none" @click.prevent="toggleModal('view')"
            >Lihat</a
          >

          <div class="btn-group dropend">
            <a href="#" class="dropdown-toggle text-decoration-none" data-bs-toggle="dropdown"
              >Lainnya</a
            >
            <ul class="dropdown-menu">
              <li>
                <a
                  href="#"
                  class="dropdown-item text-decoration-none"
                  @click.prevent="toggleModal('view')"
                  >Ubah</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="dropdown-item text-decoration-none"
                  @click.prevent="toggleModal('coordination', true, index)"
                >
                  Kordinasi
                </a>
              </li>
              <li><a href="#" class="dropdown-item text-decoration-none">Download Approval</a></li>
              <li>
                <a
                  href="#"
                  class="dropdown-item text-decoration-none"
                  @click.prevent="toggleModal('delete')"
                  >Hapus</a
                >
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Footer Pagination -->
  <div class="footer-table d-flex justify-content-between">
    <div>
      <span>Menampilkan 1-{{ data.length }} dari {{ data.length }} data</span>
    </div>
    <CPagination align="end">
      <CPaginationItem disabled>&laquo;</CPaginationItem>
      <CPaginationItem active>1</CPaginationItem>
      <CPaginationItem>2</CPaginationItem>
      <CPaginationItem>3</CPaginationItem>
      <CPaginationItem>&raquo;</CPaginationItem>
    </CPagination>
  </div>

  <!-- Modal: Kordinasi -->
  <CModal :visible="showModal.coordination" @close="toggleModal('coordination', false)">
    <CModalHeader>
      <CModalTitle>Uang Kordinasi</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="mb-3">
        <CFormInput
          label="Nominal"
          :value="data[selectedIndex]?.nominal || ''"
          readonly
          placeholder="Data nominal lama"
        />
        <CFormInput
          label="Uang Kordinasi"
          v-model="inputCoordination"
          type="number"
          placeholder="Masukkan uang kordinasi"
          text="Masukan uang kordinasi untuk mengurangi harga lama"
        />
        <CFormInput
          label="Sisa"
          :value="calculatedSisa"
          readonly
          placeholder="Auto generated nominal dikurang uang kordinasi"
        />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="toggleModal('coordination', false)">Tutup</CButton>
      <CButton color="primary">Submit</CButton>
    </CModalFooter>
  </CModal>

  <!-- Modal: Tambah/Ubah -->
  <CModal :visible="showModal.view" @close="toggleModal('view', false)">
    <CModalHeader><CModalTitle>Tambah Proyek</CModalTitle></CModalHeader>
    <CModalBody>
      <CForm class="mb-3">
        <CFormInput type="date" label="Tanggal masuk" />
        <CFormSelect
          label="Pilih kategori"
          :options="[
            { label: 'Pilihan', value: '' },
            { label: 'Iuran warga', value: '1' },
            { label: 'Iuran lingkungan', value: '2' },
            { label: 'Iuran keamanan', value: '3' },
          ]"
        />
        <CFormInput type="number" label="Nominal" />
        <CFormInput type="number" label="Uang Kordinasi" />
        <CFormInput type="number" label="Sisa" />
        <CFormTextarea label="Keterangan" placeholder="Deskripsi, alamat, dsb" rows="3" />
        <CFormInput type="file" label="Upload bukti pembayaran bangunan baru" />
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="toggleModal('view', false)">Tutup</CButton>
      <CButton color="primary">Submit</CButton>
    </CModalFooter>
  </CModal>

  <!-- Modal: Hapus -->
  <CModal :visible="showModal.delete" @close="toggleModal('delete', false)">
    <CModalHeader><CModalTitle>Konfirmasi Hapus</CModalTitle></CModalHeader>
    <CModalBody>Apakah anda yakin ingin menghapus data ini?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="toggleModal('delete', false)">Tutup</CButton>
      <CButton color="danger">Hapus</CButton>
    </CModalFooter>
  </CModal>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
