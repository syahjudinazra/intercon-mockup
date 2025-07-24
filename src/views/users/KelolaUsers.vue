<template>
  <div class="container py-5">
    <h2 class="mb-4">Kelola Users</h2>

    <!-- Toolbar -->
    <div class="d-flex justify-content-between mb-3">
      <input v-model="search" type="text" class="form-control w-50" placeholder="Cari users..." />
      <button class="btn btn-primary" @click="openUserForm()">+ Tambah Users Manual</button>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-bordered align-middle">
        <thead class="table-light">
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-secondary" @click="openUserForm(user)">Edit</button>
                <button class="btn btn-outline-info" @click="openRoleModal(user)">Roles</button>
                <button class="btn btn-outline-danger" @click="deleteUser(user)">Hapus</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal: User Form -->
    <div
      class="modal fade show d-block"
      tabindex="-1"
      v-if="showUserForm"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedUser ? 'Edit Pengguna' : 'Tambah Pengguna' }}</h5>
            <button type="button" class="btn-close" @click="closeUserForm()"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nama</label>
              <input v-model="form.name" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input v-model="form.password" class="form-control" type="password" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeUserForm()">Batal</button>
            <button class="btn btn-primary" @click="saveUser()">Simpan</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Role & Permission -->
    <div
      class="modal fade show d-block"
      tabindex="-1"
      v-if="showRoleModal"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Atur Role & Permission</h5>
            <button type="button" class="btn-close" @click="closeRoleModal()"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Role</label>
              <select class="form-select" v-model="selectedRole">
                <option v-for="role in roles" :key="role">{{ role }}</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="form-label">Permissions</label>
              <div class="row">
                <div class="col-md-6" v-for="perm in permissions" :key="perm">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="perm"
                      v-model="selectedPermissions"
                    />
                    <label class="form-check-label">{{ perm }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeRoleModal()">Batal</button>
            <button class="btn btn-primary" @click="saveRoles()">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const showUserForm = ref(false)
const showRoleModal = ref(false)
const selectedUser = ref(null)

const form = ref({
  name: '',
  email: '',
  password: '',
})

const users = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Viewer' },
])

const roles = ['Admin', 'Editor', 'Viewer']
const permissions = ['Create', 'Edit', 'Delete', 'View']

const selectedRole = ref('')
const selectedPermissions = ref([])

const filteredUsers = computed(() =>
  users.value.filter((u) => u.name.toLowerCase().includes(search.value.toLowerCase())),
)

function openUserForm(user = null) {
  selectedUser.value = user
  form.value = user ? { ...user, password: '' } : { name: '', email: '', password: '' }
  showUserForm.value = true
}

function closeUserForm() {
  showUserForm.value = false
  selectedUser.value = null
}

function saveUser() {
  if (selectedUser.value) {
    const index = users.value.findIndex((u) => u.id === selectedUser.value.id)
    users.value[index] = { ...selectedUser.value, ...form.value }
  } else {
    users.value.push({ id: Date.now(), ...form.value, role: 'Viewer' })
  }
  closeUserForm()
}

function deleteUser(user) {
  users.value = users.value.filter((u) => u.id !== user.id)
}

function openRoleModal(user) {
  selectedUser.value = user
  selectedRole.value = user.role
  selectedPermissions.value = ['View'] // Dummy
  showRoleModal.value = true
}

function closeRoleModal() {
  showRoleModal.value = false
  selectedUser.value = null
}

function saveRoles() {
  const index = users.value.findIndex((u) => u.id === selectedUser.value.id)
  users.value[index].role = selectedRole.value
  closeRoleModal()
}
</script>

<style scoped>
/* Modal backdrop workaround for Bootstrap 5 with Vue */
.modal {
  display: block;
}
</style>
