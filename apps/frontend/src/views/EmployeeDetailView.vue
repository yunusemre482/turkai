<template>
  <div class="container-fluid">
    <div class="employee row">
      <div class="col-6">
        <EmployeeList />
        <button
          class="btn btn-block btn-outline-primary mt-1"
          @click="showAddField()"
        >
          New Employee
        </button>
      </div>
      <div class="col-6">
        <div class="row">
          <div><AddNewEmp v-show="isAddFieldOn" /></div>
          <div><EditEmp v-show="isEditFieldOn" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeList from '@/components/employee/EmployeeList.vue';
import AddNewEmp from '@/components/employee/AddNewEmployee.vue';
import EditEmp from '@/components/employee/EditEmployee.vue';

export default {
  name: 'EmployeeDetailView',
  computed: {
    isAddFieldOn() {},
    isEditFieldOn() {},
  },
  components: {
    EmployeeList,
    AddNewEmp,
    EditEmp,
  },
  methods: {
    showAddField() {},
  },
};
</script>
