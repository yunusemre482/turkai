<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  value: String,
  modelValue: String,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: String): void;
}>();

const onChange = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="mb-4">
    <label class="mb-2.5 block font-medium text-black dark:text-white">{{
      props.label
    }}</label>
    <div class="relative">
      <input
        :type="props.type"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="onChange"
        class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
      />

      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
