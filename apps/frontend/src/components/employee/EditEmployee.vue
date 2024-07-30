<template>
  <div>
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
        <input type="text" class="form-control" v-model="typeEmp" />
      </div>
    </div>
    <button
      class="btn btn-block btn-outline-success"
      @click="confirmEdits(empId)"
    >
      Confirm Editing
    </button>
    <button class="btn btn-block btn-outline-danger" @click="cancelEditing">
      Cancel Editing
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'EditEmployee',
  data() {
    return {
      firstName: '',
      lastName: '',
      typeEmp: '',
      empId: null,
    };
  },
  components: {},
  computed: {},
  methods: {
    cancelEditing() {
    },
    confirmEdits(empId) {

    },
  },
  mounted() {
  },
};
</script>
