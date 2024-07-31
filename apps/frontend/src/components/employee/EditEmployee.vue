<template>
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-[999999] bg-gray-800 bg-opacity-50"
    v-if="open"
  >
    <div
      class="absolute w-[30rem] h-[609px] mx-auto gap-[10px] rounded-3xl bg-slate-700 flex flex-col items-center justify-between py-8 px-5"
    >
      <form class="max-w-sm mx-auto w-full">
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
      </form>

      <div class="flex flex-row gap-5">
        <button
          @click="hadleUpdateEmployee"
          type="submit"
          class="text-white bg-blue-700 px-16 py-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <button
          class="bg-red rounded-md text-white px-16 py-2"
          @click="cancelEditing"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import { UPDATE_EMPLOYEE } from '@/store/mutation';

export default defineComponent({
  name: 'EditEmployee',
  components: {},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Function,
      default: null,
    },
    employee: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: 'full',
    },
  },
  data() {
    return {
      id: this.employee.id,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      phone: this.employee.phone,
    };
  },
  methods: {
    handleClose() {
      this.close();
    },
    cancelEditing() {
      this.close();
    },
    hadleUpdateEmployee() {
      store.dispatch(UPDATE_EMPLOYEE, {
        employee: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
        },
        id: this.id,
      });
    },
  },
  computed: {
    maxWidth() {
      switch (this.width) {
        case 'xs':
          return 'max-w-lg';
        case 'sm':
          return 'max-w-xl';
        case 'md':
          return 'max-w-2xl';
        case 'lg':
          return 'max-w-3xl';
        case 'full':
          return 'max-w-full';
      }
    },
  },
  mounted() {
    console.log('mounted');
    console.log(this.employee);

    const onEscape = (e: any) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.close();
      }
    };

    document.addEventListener('keydown', onEscape);
  },
});
</script>
