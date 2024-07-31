<template>
  <footer
    class="flex items-center gap-4 justify-center bg-transparent text-white mt-auto border-t-2 border-gray2 px-5 py-2 flex-col gap-10"
  >
    <div class="flex w-2/3">
      <img
        src="https://turkai.com/wp-content/uploads/2023/01/logo.turkai.white_.png"
        alt="avatar"
        class="w-full h-full"
      />
    </div>
    <div class="flex">
      <button
        @click="logout"
        class="flex flex-row bg-slate-400 rounded-sm w-52 py-4 items-center mx-auto justify-center gap-10"
      >
        <span> Logout</span>
        <div>
          <svg
            fill="#000000"
            height="18px"
            width="18px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 384.971 384.971"
            xml:space="preserve"
            class="text-white"
          >
            <g>
              <g id="Sign_Out">
                <path
                  d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03    C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03    C192.485,366.299,187.095,360.91,180.455,360.91z"
                />
                <path
                  d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279    c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179    c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
                />
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </g>
          </svg>
        </div>
      </button>
    </div>
  </footer>
</template>

<script lang="ts">
import router from '@/router';
import store from '@/store';
import { LOGOUT } from '@/store/actions';

export default {
  name: 'SideBarFooter',
  data() {
    return {};
  },
  methods: {
    logout() {
      store.dispatch(LOGOUT);

      router.push('/auth/login');
    },
  },
};
</script>

<style></style>
