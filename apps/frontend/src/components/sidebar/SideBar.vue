<template>
  <nav
    class="fixed h-full left-0 top-0 flex justify-start z-[1101] bg-primary max-w-sm w-64 py-8 px-0 border-solid border-r border-border text-primary"
    :class="{ 'bg-primary': !showMenu, 'bg-primary': showMenu }"
  >
    <div
      class="container mx-auto flex max-w-sm items-start justify-start flex-col gap-12"
    >
      <SideBarProfile v-if="!isHomePage" />
      <div class="flex items-center w-full bg-inherit gap-2">
        <ul class="flex flex-col list-none w-full bg-none gap-6">
          <SideBarItem
            v-for="route in activeRoutes"
            :key="route.title"
            :title="route.title"
            :route="route.route"
            :icon="route.icon"
          >
            <template #icon> {{ icon }}</template>
          </SideBarItem>
        </ul>
      </div>
      <SideBarFooter />
    </div>
  </nav>
</template>

<script>
import SideBarItem from '@/components/sidebar/SideBarItem.vue';
import SideBarFooter from '@/components/sidebar/SideBarFooter.vue';
import SideBarProfile from '@/components/sidebar/SideBarProfile.vue';

import {
  IconUsers,
  IconNotebook,
  IconCheckupList,
  IconPhotoHeart,
} from '@tabler/icons-vue';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  components: {
    SideBarItem,
    SideBarFooter,
    SideBarProfile,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    activeRoutes() {
      const routes = [
        {
          title: 'employee',
          route: '/employee',
          icon: IconUsers,
        },
        {
          title: 'companies',
          route: '/companies',
          icon: IconCheckupList,
        },
      ];

      const currentPath = this.$route.path;

      console.log('currentPath:', currentPath);

      if (currentPath === '/') {
        return routes.filter((route) => route.route === currentPath);
      }

      console.log('currentPath 2:', currentPath);

      const activeRoutes = routes.filter((route) => route.route !== '/');

      const currentRoutes = activeRoutes.map((route) => ({
        icon: route.icon,
        title: route.title,
        route: {
          name: route.title,
          params: {
            userId: store.getters.user?.id || 1,
          },
        },
        status: 'active',
      }));

      console.log(currentRoutes);

      return currentRoutes;
    },

    isHomePage() {
      return this.$route.path === '/';
    },
  },
  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu;
    },
  },
});
</script>

<style></style>
