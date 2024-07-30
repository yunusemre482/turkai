<template>
  <div
    v-if="user"
    class="w-full h-68 mx-auto flex border-b-2 border-gray-2y py-6 px-2 gap-4"
  >
    <img
      class="w-12 h-12 object-cover rounded-full"
      src="@/assets/images/profile.png"
    />
    <div class="person-info">
      <span class="text-lg text-black-title"> {{ user.name }} </span>
      <div class="text-sm text-gray">
        <a :href="'mailto:' + user.email" class="underline">
          {{ user.email }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'SideBarProfile',
  components: {},
  computed: {
    user() {
      return store.getters.user;
    },
  },
  created() {
    console.log(this.user);
  },
});
</script>

<style></style>
