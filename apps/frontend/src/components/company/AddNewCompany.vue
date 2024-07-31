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
        v-on:submit.prevent="handleAddCompany"
      >
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
      </form>

      <div class="flex flex-row gap-5">
        <button
          @click="handleAddCompany"
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
      name: 'Turkai',
      email: 'info@turkai.com',
      logo: 'https://media.licdn.com/dms/image/C4D0BAQHk9_eP8MLtMA/company-logo_200_200/0/1635101899471/turkai_logo?e=2147483647&v=beta&t=Rm4EqGfUY648vRACv6Mzq94mzdE_gb8DPMAEwyblGk0',
      phone: '+905555535556',
      website: 'https://turkai.com',
      description: 'welcome to turkai',
    };
  },
  components: {},
  computed: {},
  methods: {
    async handleAddCompany() {
      const isSuccess = await store.dispatch(CREATE_COMPANY, {
        name: this.name,
        email: this.email,
        logo: this.logo,
        phone: this.phone,
        website: this.website,
        description: this.description,
      });

      if (isSuccess) {
        alert('Company added successfully');
        this.close();
      }
    },

    cancel() {
      this.close();
    },
  },
};
</script>
