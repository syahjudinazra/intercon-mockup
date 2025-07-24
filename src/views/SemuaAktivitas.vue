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
  <h2>Semua Aktivitas</h2>
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Tanggal</th>
        <th scope="col">Users</th>
        <th scope="col">Sebelum</th>
        <th scope="col">Sesudah</th>
        <th scope="col">Keterangan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>18/07/2025</td>
        <td>Cika</td>
        <td>-</td>
        <td>Memasukan data deposito</td>
        <td>Cika telah menambahkan data deposito</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>22/07/2025</td>
        <td>Juko</td>
        <td>Harga: Rp. 20.000.000,00</td>
        <td>Harga: Rp. 18.000.000,00</td>
        <td>Juko telah mengubah data estimasi</td>
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
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
