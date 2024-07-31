<script setup lang="ts">
import HeaderArea from '@/components/header/HeaderArea.vue';
</script>

<template>
  <!-- ===== Page Wrapper Start ===== -->
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Content Area Start ===== -->
    <div
      class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
    >
      <!-- ===== Main Content Start ===== -->
      <main class="h-full w-full">
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 h-full flex">
          <slot></slot>
        </div>
      </main>
      <!-- ===== Main Content End ===== -->
    </div>
  </div>
  <!-- ===== Page Wrapper End ===== -->
</template>
