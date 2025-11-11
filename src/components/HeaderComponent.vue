<template>
  <Disclosure :class="['border-b-4 border-b-orange-500 fixed top-0 w-full z-50 transition-all duration-300 shadow-lg', isScrolledDown ? 'bg-slate-900/95 backdrop-blur-sm' : 'bg-slate-900/90 backdrop-blur-sm']" as="nav" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-3">
            <img src="../assets/github_white.png" alt="Github Logo" class="h-12 w-24 object-contain" />
            <h2 class="text-3xl text-white font-bold tracking-tight">Finder</h2>
          </div>
          <button 
            @click="toggleDarkMode" 
            class="hidden sm:flex items-center px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-200 hover:text-white transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
          >
            <span>{{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}</span>
          </button>
        </div>
        
        <div class="hidden sm:flex items-center space-x-2">
          <router-link
            to="/"
            class="text-gray-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm"
          >
            Home
          </router-link>
          
          <router-link
            to="/about"
            class="text-gray-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm"
          >
            About
          </router-link>
        </div>

        <div class="flex sm:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
      <div class="px-4 pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="text-gray-300 hover:text-white hover:bg-slate-800 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
        >
          Home
        </router-link>
      
        <router-link
          to="/about"
          class="text-gray-300 hover:text-white hover:bg-slate-800 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
        >
          About
        </router-link>
        
        <button 
          @click="toggleDarkMode" 
          class="w-full text-left text-gray-300 hover:text-white hover:bg-slate-800 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
        >
          {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
        </button>
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
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('darkMode', value);
};

const checkScroll = () => {
  if (window.scrollY > 100) {
    isScrolledDown.value = true;
  } else {
    isScrolledDown.value = false;
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