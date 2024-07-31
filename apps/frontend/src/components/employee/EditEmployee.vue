<template>
  <div
    class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-[999999]"
    v-if="open"
  >
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class="input-group">
      <div class="input-group-prepend m-2 w-100">
        <span class="input-group-text" id="">First Name</span>
        <input type="text" class="form-control" v-model="firstName" />
      </div>
      <div class="input-group-prepend m-2 w-100">
        <span class="input-group-text" id="">Last Name</span>
        <input type="text" class="form-control" v-model="lastName" />
      </div>
      <div class="input-group-prepend m-2 w-100">
        <span class="input-group-text" id="">Type of Employee</span>
        <input type="text" class="form-control" v-model="email" />
      </div>
    </div>
    <button
      class="btn btn-block btn-outline-success"
      @click="hadleUpdateEmployee()"
    >
      Confirm Editing
    </button>
    <button class="btn btn-block btn-outline-danger" @click="cancelEditing">
      Cancel Editing
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import { UPDATE_EMPLOYEE } from '@/store/mutation';

export default defineComponent({
  name: 'EmployeeEdit',
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
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
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
        id: this.employee.id,
        firstName: this.firstName,
        lastName: this.lastName,
        typeEmp: this.email,
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
    const onEscape = (e: any) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.close();
      }
    };

    document.addEventListener('keydown', onEscape);
  },
});
</script>
