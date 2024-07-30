<template>
  <li class="relative nav-item group  hover:bg-white ">
    <div class="absolute left-0 bg-purple w-[6px] h-full rounded-r-md"/>
    <RouterLink
        :to="{name: route.name, params: route.params}"
        class="nav-link px-3 py-2 flex items-center text-xs font-bold leading-snug hover:opacity-75 justify-start ml-4"
    >
      <component :is="icon" class="mr-2 w-6 text-[#4F359B]"></component>
      <span
          class="ml-2 font-normal text-gray text-lg group-hover:text-purple"
      >{{ title }}</span
      >
    </RouterLink>
  </li>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SideBarItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    route: {
      type: Object,
      required: true,
    },
    icon: {
      type: Function,
      required: true,
    }
  },
  created() {
      console.log(this.route);
  },
});
</script>

<style></style>
