<template>
  <DefaultLayout>
    <div
      class="lex flex-col px-4 py-2 gap-5 max-w-screen-2xl w-full mx-auto my-auto"
    >
      <div class="bg-graydark flex flex-row py-4 px-4">
        <h3 class="flex flex-row text-white px-5 text-center py-3">
          Company List
        </h3>
        <button
          class="ml-auto bg-cyan-200 rounded-md text-boxdark px-10 py-2"
          @click="showAddCompanyModal"
        >
          Add New Company
        </button>
      </div>
      <div class="employee row flex flex-col w-full">
        <CompanyList />
        <nav aria-label="Page navigation example" class="my-2 mx-auto px-2">
          <ul class="inline-flex -space-x-px text-base h-10 px-3">
            <li>
              <button
                @click.prevent="changePage(companyMetadata.page - 1)"
                :class="[
                  'flex items-center justify-center h-10 ms-0 leading-tight px-8 w-28 rounded-s-lg',
                  companyMetadata.page !== 1
                    ? 'text-gray-500 bg-white border border-e-0 border-gray-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                    : 'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700  border   dark:hover:text-white',
                ]"
              >
                Previous
              </button>
            </li>
            <li
              v-for="pageNumber in companyMetadata.totalPage"
              :key="pageNumber"
            >
              <a
                href="#"
                @click.prevent="changePage(pageNumber)"
                :class="[
                  'flex items-center justify-center px-4 h-10 leading-tight',
                  companyMetadata.page === pageNumber
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                ]"
                >{{ pageNumber }}</a
              >
            </li>
            <li class="flex">
              <a
                href="#"
                @click.prevent="changePage(companyMetadata.page + 1)"
                :class="[
                  'flex items-center justify-center px-4 h-10 ms-0 leading-tight  w-28 border border-e-0 border-gray-300 ',
                  companyMetadata.page !== companyMetadata.totalPage
                    ? 'text-gray-500 bg-white rounded-e-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                    : 'hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700   rounded-e-lg  dark:hover:text-white ',
                ]"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <AddNewCompany :open="isAddFieldOn" :close="handleClose" />
    </div>
  </DefaultLayout>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import CompanyList from '@/components/company/CompanyList.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { FETCH_COMPANIES } from '@/store/actions';
import AddNewCompany from '@/components/company/AddNewCompany.vue';

export default {
  name: 'Company',
  data() {
    return {
      isAddFieldOn: false,
      isEditFieldOn: false,
    };
  },
  computed: {
    isEditFieldOn() {},
    ...mapGetters({
      companies: 'companies',
      companyMetadata: 'companyMetadata',
    }),
  },
  components: {
    CompanyList,
    AddNewCompany,
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch(`${FETCH_COMPANIES}`)]).then(() => {
      next();
    });
  },
  methods: {
    fetchCompanies() {
      store.dispatch(FETCH_COMPANIES);
    },
    showAddCompanyModal() {
      console.log('showAddCompanyModal');

      this.isAddFieldOn = true;
    },
    handleClose() {
      this.isAddFieldOn = false;
    },

    changePage(newPage) {
      console.log('changing page to', newPage);

      if (newPage > 0 && newPage <= this.companyMetadata.totalPage) {
        store.dispatch(FETCH_COMPANIES, { page: newPage, limit: 15 });
      }
    },
  },
  created() {
    this.fetchCompanies();
  },
};
</script>
