<script setup>
import { ref } from 'vue'
const visibleLiveDemo = ref(false)
const visibleLiveDemo2 = ref(false)
const penyusutan = ref([
  { label: 'Penyusutan ke-1', value: 'Rp. 18.000.000,00' },
  { label: 'Penyusutan ke-2', value: 'Rp. 15.000.000,00' },
  { label: 'Penyusutan ke-3', value: 'Rp. 12.000.000,00' },
])
</script>
<template>
  <h2>Komplain Saya</h2>
  <div class="my-komplain-form">
    <CForm class="row g-3">
      <CCol md="6">
        <CFormLabel for="inputEmail4">Nama Pengguna</CFormLabel>
        <CFormInput type="text" id="inputEmail4" placeholder="Auto generated from user login" />
      </CCol>
      <CCol md="6">
        <CFormLabel for="inputDAte">Tanggal</CFormLabel>
        <CFormInput type="date" id="inputDAte" />
      </CCol>
      <CCol xs="12">
        <CFormLabel for="inputKomplain">Komplain Saya</CFormLabel>
        <CFormInput id="inputKomplain" placeholder="Pohon tumbang, Jalan rusak, dsb" />
      </CCol>
      <CCol xs="12">
        <CFormTextarea
          id="exampleFormControlTextarea1"
          label="Keterangan"
          placeholder="Detail Komplain, Deskripsi, Alamat, dsb"
          rows="3"
        ></CFormTextarea>
      </CCol>
      <CCol xs="12">
        <CFormInput
          type="file"
          class="mb-3"
          id="formFile"
          label="Upload bukti komplain (Optional)"
        />
      </CCol>
      <CCol xs="12">
        <CButton type="submit" color="primary" class="mb-3">Submit Komplain</CButton>
      </CCol>
    </CForm>
  </div>
  <div class="d-flex justify-content-end gap-2 mb-3">
    <div class="utility-table d-flex gap-2">
      <CInputGroup>
        <CFormInput placeholder="Cari..." aria-label="Cari..." aria-describedby="button-addon2" />
        <CButton type="button" color="secondary" variant="outline" id="button-addon2"
          >Search</CButton
        >
      </CInputGroup>
      <CDropdown variant="btn-group">
        <CDropdownToggle color="success">Excel</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href="#">Export data</CDropdownItem>
          <CDropdownItem href="#">Import data</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  </div>
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Tanggal</th>
        <th scope="col">User</th>
        <th scope="col">Komplain saya</th>
        <th scope="col">Keterangan</th>
        <th scope="col">Status</th>
        <th scope="col">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>18/07/2025</td>
        <td>Cika</td>
        <td>Pohon tumbang</td>
        <td>Mohon dibersihkan dari jalan</td>
        <td><span class="badge bg-secondary text-white">Antrian</span></td>
        <td class="d-flex gap-2">
          <a
            href="#"
            :class="{ 'text-decoration-none': true }"
            @click.prevent="
              () => {
                visibleLiveDemo = true
              }
            "
            class="text-primary"
          >
            Lihat
          </a>
          <!-- Default dropend button -->
          <div class="btn-group dropend">
            <a
              href="#"
              class="dropdown-toggle text-decoration-none"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Lainya
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-item">
                <a
                  href="#"
                  :class="{ 'text-decoration-none': true }"
                  @click.prevent="
                    () => {
                      visibleLiveDemo = true
                    }
                  "
                >
                  Ubah
                </a>
              </li>
              <li class="dropdown-item">
                <a
                  href="#"
                  :class="{ 'text-decoration-none': true }"
                  @click.prevent="
                    () => {
                      visibleLiveDemo2 = true
                    }
                  "
                >
                  Hapus
                </a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>21/07/2025</td>
        <td>Mulia</td>
        <td>Jalanan rusak</td>
        <td>Mohon diperbaiki jalananya</td>
        <td><span class="badge bg-primary text-white">Diproses</span></td>
        <td class="d-flex gap-2">
          <a
            href="#"
            :class="{ 'text-decoration-none': true }"
            @click.prevent="
              () => {
                visibleLiveDemo = true
              }
            "
            class="text-primary"
          >
            Lihat
          </a>
          <!-- Default dropend button -->
          <div class="btn-group dropend">
            <a
              href="#"
              class="dropdown-toggle text-decoration-none"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Lainya
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-item">
                <a
                  href="#"
                  :class="{ 'text-decoration-none': true }"
                  @click.prevent="
                    () => {
                      visibleLiveDemo = true
                    }
                  "
                >
                  Ubah
                </a>
              </li>
              <li class="dropdown-item">
                <a href="#" :class="{ 'text-decoration-none': true }"> Download Pdf </a>
              </li>
              <li class="dropdown-item">
                <a
                  href="#"
                  :class="{ 'text-decoration-none': true }"
                  @click.prevent="
                    () => {
                      visibleLiveDemo2 = true
                    }
                  "
                >
                  Hapus
                </a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="footer-table d-flex justify-content-between">
    <div>
      <span>Menampilkan 1-2 dari 2 data</span>
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
      <CModalTitle id="LiveDemoExampleLabel">Tambah data</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="mb-3">
        <CFormInput
          type="date"
          id="tanggal"
          label="Tanggal"
          placeholder="Masukan tanggal"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="text"
          id="pengguna"
          label="Nama Pengguna"
          placeholder="Masukan nama pengguna"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormInput
          type="text"
          id="komplain"
          label="Komplain saya"
          placeholder="Masukan komplain"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CFormTextarea
        class="mb-3"
        id="exampleFormControlTextarea1"
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
      <CFormInput type="file" class="mb-3" id="formFile" label="Upload bukti komplain" />
      <CFormInput
        type="file"
        class="mb-3"
        id="formFile"
        label="Upload bukti komplain selesai ditangani (petugas)"
      />
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
      <CButton color="danger">Hapus</CButton>
    </CModalFooter>
  </CModal>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
