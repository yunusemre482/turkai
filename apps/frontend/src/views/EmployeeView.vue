<template>
  <DefaultLayout>
    <div
      class="flex flex-col px-4 py-2 gap-5 max-w-screen-xl w-full mx-auto my-auto"
    >
      <div class="bg-graydark flex flex-row py-4 px-4">
        <h4 class="flex flex-row text-white px-5 text-center py-3">
          Employee List
        </h4>
        <button
          class="ml-auto bg-cyan-200 rounded-md text-boxdark px-10 py-2"
          @click="showAddEmployeeModal"
        >
          Add New Employee
        </button>
      </div>
      <div class="flex flex-col gap-2">
        <EmployeeList />
        <nav aria-label="Page navigation example" class="my-2 mx-auto px-2">
          <ul class="inline-flex -space-x-px text-base h-10 px-3">
            <li>
              <button
                @click="changePage(employeeMetadata.page - 1)"
                :class="[
                  'flex items-center justify-center h-10 ms-0 leading-tight px-8 w-28 rounded-s-lg',
                  employeeMetadata.page !== 1
                    ? 'text-gray-500 bg-white border border-e-0 border-gray-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                    : 'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700  border   dark:hover:text-white',
                ]"
              >
                Previous
              </button>
            </li>
            <li
              v-for="pageNumber in employeeMetadata.totalPage"
              :key="pageNumber"
            >
              <a
                href="#"
                @click="changePage(pageNumber)"
                :class="[
                  'flex items-center justify-center px-4 h-10 leading-tight',
                  employeeMetadata.page === pageNumber
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                ]"
                >{{ pageNumber }}</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="changePage(employeeMetadata.page + 1)"
                :class="[
                  'flex items-center justify-center px-4 h-10 ms-0 leading-tight  w-28 border border-e-0 border-gray-300 ',
                  employeeMetadata.page !== employeeMetadata.totalPage
                    ? 'text-gray-500 bg-white rounded-e-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 w-16'
                    : 'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700   rounded-e-lg  dark:hover:text-white w-16',
                ]"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <AddNewEmployee
        :open="isAddFieldOn"
        :close="handleClose"
      />
    </div>
  </DefaultLayout>
</template>

<script>
import EmployeeList from '@/components/employee/EmployeeList.vue';
import EditEmp from '@/components/employee/EditEmployee.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import store from '@/store';
import { mapGetters } from 'vuex';
import { FETCH_EMPLOYEES } from '@/store/actions';
import AddNewEmployee from '@/components/employee/AddNewEmployee.vue';

export default {
  name: 'Employee',
  data() {
    return {
      isAddFieldOn: false,
      isEditFieldOn: false,
    };
  },
  computed: {
    ...mapGetters({
      employees: 'employees',
      employeeMetadata: 'employeeMetadata',
    }),
  },
  components: {
    EmployeeList,
    AddNewEmployee,
    EditEmp,
  },
  beforeCreate(to, from, next) {
    Promise.all([store.dispatch(`${FETCH_EMPLOYEES}`)]);
  },
  methods: {
    fetchEmployees() {
      store.dispatch(FETCH_EMPLOYEES);
    },
    showAddEmployeeModal() {
      this.isAddFieldOn = true;
    },
    handleClose() {
      this.isAddFieldOn = false;
    },

    changePage(newPage) {
      console.log('changing page to', newPage);

      if (newPage > 0 && newPage <= this.employeeMetadata.totalPage) {
        store.dispatch(FETCH_EMPLOYEES, { page: newPage, limit: 15 });
      }
    },
  },
  created() {
    this.fetchEmployees();
  },
};
</script>
