<template>
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-[999999] bg-gray-800 bg-opacity-50"
    v-if="open"
  >
    <div
      class="absolute w-[30rem] h-[609px] mx-auto gap-[10px] rounded-3xl bg-slate-700 flex flex-col items-center justify-between py-8 px-5"
    >
      <form
        class="max-w-sm mx-auto w-full"
        v-on:submit.prevent="handleAddEmployee"
      >
        <div class="mb-5">
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your First Name</label
          >
          <input
            type="firstName"
            id="firstName"
            v-model="firstName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your Last Name</label
          >
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last Name"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-white-600 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your Phone Number</label
          >
          <input
            type="text"
            id="phone"
            v-model="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Phone Number"
          />
        </div>
        <div class="mb-5">
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Select Company</label
          >
          <select
            id="companyId"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            v-model="companyId"
            :aria-selected="companies[0].id"
          >
            <option
              v-for="company in companies"
              :key="company.id"
              :value="company.id"
            >
              {{ company.name }}
            </option>
          </select>
        </div>
      </form>

      <div class="flex flex-row gap-5">
        <button
          @click="handleAddEmployee"
          type="submit"
          class="text-white bg-blue-700 px-16 py-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button class="bg-red rounded-md text-white px-16 py-2" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { CREATE_EMPLOYEE, FETCH_COMPANIES } from '@/store/actions';
import companies from '@/store/modules/companies';
import { Company } from '@/types/companies.types';
import { mapGetters } from 'vuex';

export default {
  name: 'AddNewEmployee',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyId: '',
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      companies: 'companies',
    }),
  },
  methods: {
    async handleAddEmployee() {
      console.log('handleAddEmployee', 'employee', this.companies);

      console.log(
        'Employee adding',
        this.firstName,
        this.lastName,
        this.email,
        this.phone,
        this.companyId
      );

      const isSuccess = await store.dispatch(CREATE_EMPLOYEE, {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        companyId: this.companyId,
      });

      console.log('isSuccess', isSuccess);

      if (isSuccess) {
        alert('Employee added successfully');
        this.close();
      }
    },
    cancel() {
      console.log('cancel', 'employee', this.companies);
      this.close();
    },
  },
  created() {
    console.log('AddNewEmployee created', this.companies);
    store.dispatch(FETCH_COMPANIES, {
      page: 1,
    });
  },
};
</script>
