<template>
  <div class="employee-list">
    <ul class="list-none">
      <li
        class="flex justify-between items-center p-4 border-b border-gray-200"
        v-for="(emp, index) in employees"
        :key="emp.employee_id"
      >
        <div class="w-1/2">
          <router-link
            :to="{
              name: 'employeeProfile',
              params: { empId: emp.employee_id },
            }"
            class="text-blue-500 hover:underline"
          >
            {{ emp.empFirstName + ' ' + emp.empLastName }}
          </router-link>
        </div>
        <div class="w-1/2 flex justify-end space-x-2">
          <button
            class="btn btn-danger bg-red-500 text-white px-4 py-2 rounded"
            @click="deleteEmp(index)"
          >
            Delete
          </button>
          <button
            class="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded"
            @click="showEditField(emp)"
          >
            Edit
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'EmployeeList',
  computed: {
    employees() {
    },
  },
  methods: {
    deleteEmp(index) {

    },
    showEditField(emp) {
    },
  },
};
</script>

<style scoped></style>
