<template>
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-[999999] bg-gray-800 bg-opacity-50"
    v-if="open"
  >
    <div
      class="absolute w-[28rem] mx-auto gap-10 rounded-3xl bg-slate-700 flex flex-col items-center justify-between py-10 px-5"
    >
      <form class="max-w-sm mx-auto w-full">
        <div class="mb-5">
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Company Name</label
          >
          <input
            type="name"
            id="name"
            v-model="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-white-600 dark:text-white"
            >Company email</label
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
            >Company Phone Number</label
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
            >Company Logo</label
          >
          <input
            type="text"
            id="logo"
            v-model="logo"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Logo Url"
          />
        </div>

        <div class="mb-5">
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Company website</label
          >
          <input
            type="text"
            id="website"
            v-model="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Website Url"
          />
        </div>
        <div class="mb-5">
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Company description</label
          >
          <textarea
            type="text"
            lines="3"
            id="description"
            v-model="description"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Website Url"
          />
        </div>
      </form>

      <div class="flex flex-row gap-5">
        <button
          @click="handleUpdateCompany"
          type="button"
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
import { CREATE_COMPANY } from '@/store/actions';
import { Company } from '@/types/companies.types';
import { mapGetters } from 'vuex';

export default {
  name: 'AddNewEmployee',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Function,
      default: null,
    },
    company: {
      type: Object || null,
      default: () => ({}),
      required: true,
    },
    width: {
      type: String,
      default: 'full',
    },
  },
  data() {
    return {
      name: this.company.name || '',
      email: this.company.email || '',
      logo: this.company.logo || '',
      phone: this.company.phone || '',
      website: this.company.website || '',
      description: this.company.description || '',
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      companies: 'companies',
    }),
    company: {
      get(): Company {
        return this.company;
      },
      set(value: Company) {
        this.company = value;
      },
    },
  },
  methods: {
    async handleUpdateCompany() {
      // remove empty fields in the company object
      const company = Object.fromEntries(
        Object.entries(this.company).filter(([_, v]) => v !== '')
      );

      const isSuccess = await store.dispatch(CREATE_COMPANY, {
        company,
        id: this.company.id,
      });

      if (isSuccess) {
        alert('Company added successfully');
        this.close();
      }

      alert('We are sorry, something went wrong');
    },

    cancel() {
      this.close();
    },
    created() {
      console.log('company', this.company);
    },
  },
};
</script>
