<script lang="ts">
import HeaderArea from '@/components/header/HeaderArea.vue';
import SideBar from '@/components/sidebar/SideBar.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    SideBar,
  },
});
</script>

<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Sidebar Start ===== -->
    <side-bar />
    <!-- ===== Sidebar End ===== -->

    <!-- ===== Content Area Start ===== -->
    <div
      class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
    >
      <!-- ===== Header Start ===== -->
      <HeaderArea />
      <!-- ===== Header End ===== -->

      <!-- ===== Main Content Start ===== -->
      <main class="w-[calc(100%-16rem)] ml-64 p-2 max-w-8xl flex justify-center">
        <div class="mx-auto p-4 md:p-6 2xl:p-10 h-full">
          <slot></slot>
        </div>
      </main>
      <!-- ===== Main Content End ===== -->
    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->
</template>
