<script setup>
import { ref } from 'vue'
const visibleLiveDemo = ref(false)
const visibleLiveDemo2 = ref(false)
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
        <th scope="col">Nama Proyek</th>
        <th scope="col">Tanggal Selesai</th>
        <th scope="col">Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>18/07/2025</td>
        <td>Pembangunan Jalan</td>
        <td>25/07/2025</td>
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
        <th scope="row">2</th>
        <td>11/07/2025</td>
        <td>Pembangunan jembatan</td>
        <td>20/07/2025</td>
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
        <th scope="row">3</th>
        <td>12/07/2025</td>
        <td>Perbaikan pagar</td>
        <td>16/07/2025</td>
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
      <CModalTitle id="LiveDemoExampleLabel">Contoh tipe inputan yang akan digunakan</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <CFormInput
          type="text"
          id="nama-proyek"
          label="Contoh Text"
          placeholder="Masukan data"
          text="Must be 8-20 characters long."
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </CForm>
      <CFormTextarea
        id="exampleFormControlTextarea1"
        label="Contoh textarea"
        placeholder="Deskripsi, alamat, dsb"
        rows="3"
        text="Must be 8-20 characters long."
      ></CFormTextarea>
      <CFormSelect
        id="exampleFormControlSelect1"
        label="Contoh pilihan"
        :options="[
          { label: 'Pilihan', value: '' },
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
        ]"
      ></CFormSelect>
      <CFormCheck
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault1"
        label="Contoh radio"
      />
      <CFormSwitch label="Contoh switch" id="formSwitchCheckDefault" />
      <CFormInput type="file" id="formFile" label="Contoh file input" />
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
