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
  <h2>Penyusutan</h2>
  <div class="d-flex justify-content-between gap-2 mb-3">
    <CButton color="primary" @click="visibleLiveDemo = true">Tambah data</CButton>
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
        <CFormInput placeholder="Cari..." aria-label="Cari..." aria-describedby="button-addon2" />
        <CButton type="button" color="secondary" variant="outline" id="button-addon2"
          >Search</CButton
        >
      </CInputGroup>
    </div>
  </div>
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Tanggal Masuk</th>
        <th scope="col">Nama Asset</th>
        <th scope="col">Harga</th>
        <th scope="col">Penyusutan ke-1</th>
        <th scope="col">Penyusutan ke-2</th>
        <th scope="col">Penyusutan ke-3</th>
        <th scope="col">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>18/07/2025</td>
        <td>Motor</td>
        <td>Rp. 20.000.000,00</td>
        <td><del>Rp. 18.000.000,00</del></td>
        <td><del>Rp. 15.000.000,00</del></td>
        <td><del>Rp. 12.000.000,00</del></td>
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
      <tr>
        <th scope="row">1</th>
        <td>20/07/2025</td>
        <td>Mobil</td>
        <td>Rp. 20.000.000,00</td>
        <td><del>Rp. 18.000.000,00</del></td>
        <td><del>Rp. 15.000.000,00</del></td>
        <td><del>Rp. 12.000.000,00</del></td>
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
          id="tanggal-masuk"
          label="Tanggal masuk"
          placeholder="Masukan tanggal masuk"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CFormSelect
        class="mb-3"
        id="exampleFormControlSelect1"
        label="Pilih asset"
        :options="[
          { label: 'Pilih assets', value: '' },
          { label: 'Motor', value: '1' },
          { label: 'Mobil', value: '2' },
          { label: 'Sepeda', value: '3' },
        ]"
      ></CFormSelect>
      <CForm class="mb-3">
        <CFormInput
          type="text"
          id="harga"
          label="Harga"
          placeholder="Rp. x.xxx.xxx,xx"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CForm class="mb-3" v-for="(item, index) in penyusutan" :key="index">
        <CFormLabel :for="'penyusutan' + (index + 1)">
          {{ item.label }}
        </CFormLabel>
        <CFormInput
          type="text"
          :id="'penyusutan' + (index + 1)"
          v-model="item.value"
          :placeholder="`Masukan ${item.label.toLowerCase()}`"
          :aria-describedby="`penyusutanHelp${index}`"
          readonly
        />
      </CForm>
      <CFormTextarea
        class="mb-3"
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
