<template>
  <Disclosure as="nav" class="bg-primary-200" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16">
        <div class="flex items-center w-full justify-between">
          <div class="flex-shrink-0">
            <h2 class="text-2xl text-white font-bold">Github Finder</h2>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              
              <router-link
                to="/"
                href="#"
                class="text-gray-300 hover:bg-primary-100 transition-all duration-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Home</router-link
              >
              
              <router-link
                to="/about"
                class="text-gray-300 hover:bg-primary-100 transition-all duration-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
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
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
</script>
