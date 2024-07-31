<template>
  <DefaultLayout>
    <div class="flex flex-col px-4 py-2 gap-5">
      <div class="bg-graydark flex flex-row py-4 px-4">
        <h class="flex flex-row text-white px-5 text-center py-3"
          >Company List</h
        >
        <button
          class="ml-auto bg-cyan-200 rounded-md text-boxdark px-10 py-2"
          @click="openModal"
        >
          Add New Company
        </button>
      </div>
      <div class="employee row">
        <CompanyList />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import store from '@/store';
import { FETCH_COMPANIES, FETCH_EMPLOYEES } from '@/store/actions';
import CompanyList from '@/components/company/CompanyList.vue';

export default {
  name: 'Company',
  data() {
    return {
      isAddFieldOn: false,
      isEditFieldOn: false,
      isModalOpen: false,
    };
  },
  computed: {
    isAddFieldOn() {},
    isEditFieldOn() {},
  },
  components: {
    CompanyList,
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch(`${FETCH_COMPANIES}`)]).then(() => {
      next();
    });
  },
  methods: {
    fetchEmployees() {
      store.dispatch(FETCH_COMPANIES);
    },
    showAddField() {},
  },
  created() {
    this.fetchEmployees();
  },
};
</script>
