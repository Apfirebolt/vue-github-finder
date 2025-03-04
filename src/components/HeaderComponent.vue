<template>
  <Disclosure :class="['border-b-4 border-b-orange-500 lg:py-2 fixed top-0 w-full z-10 transition-all duration-300', isScrolledDown ? 'bg-primary-300 dark:bg-slate-800' : 'bg-primary-200 dark:bg-slate-700 dark:text-white']" as="nav" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16">
        <div class="flex items-center w-full justify-between">
          <div class="justify-between flex items-center">
            <img src="../assets/github_white.png" alt="Github Logo" class="h-16 w-32 mr-6 my-2" />
            <h2 class="text-2xl text-white font-bold">Finder</h2>
            <button @click="toggleDarkMode" class="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              
              <router-link
                to="/"
                href="#"
                class="text-gray-300 hover:bg-primary-100 transition-all duration-200 hover:text-white px-3 py-2 rounded-md font-medium"
                >Home</router-link
              >
              
              <router-link
                to="/about"
                class="text-gray-300 hover:bg-primary-100 transition-all duration-200 hover:text-white px-3 py-2 rounded-md font-medium"
                >About</router-link
              >
            </div>
          </div>
        </div>

        <div class="-mr-2 flex sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="text-white block px-3 py-2 rounded-md text-base font-medium"
          >Home</router-link
        >
      
        <router-link
          to="/about"
          class="text-white block px-3 py-2 rounded-md text-base font-medium"
          >About</router-link
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

const isDarkMode = ref(false);
const isScrolledDown = ref(false);

const setDarkMode = (value) => {
  isDarkMode.value = value;
  if (value) {
    console.log('dark mode');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('darkMode', value);
};

const checkScroll = () => {
  if (window.scrollY > 100) {
    isScrolledDown.value = true;
    console.log('scrolled down');
  } else {
    isScrolledDown.value = false;
    console.log('scrolled up');
  }
};

window.addEventListener('scroll', checkScroll);

onMounted(() => {
  checkScroll();
});

const toggleDarkMode = () => {
  setDarkMode(!isDarkMode.value);
};

watch(isDarkMode, (newValue) => {
  setDarkMode(newValue);
});

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode !== null) {
    setDarkMode(savedDarkMode === 'true');
  } else {
    setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  checkScroll();
});
</script>