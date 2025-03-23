<script setup>
import { ref } from "vue";
import { motion } from "motion-v";
import Loader from "../components/Loader.vue";

const showModal = ref(false);

</script>

<template>
  <div>
    <motion.section
      class="shadow sm:rounded-lg mt-10"
      id="about"
      :initial="{ opacity: 0, y: 100 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.1 }"
    >
      <div class="px-4 py-5">
        <h2 class="text-3xl my-2 py-2 text-center text-jet-black mt-10">
          ABOUT
        </h2>
        <div class="flex flex-col items-center">
          <p>
            Github Finder is a simple web application that allows users to
            search for Github users and view their profile details. The app uses
            the Github API to fetch user data and display it in a user-friendly
            way.
          </p>
        </div>
      </div>
    </motion.section>
    <div>
    <button @click="showModal = true" class="my-2 px-2 py-3 text-center text-primary-200 bg-secondary-300 rounded-md shadow-md">Open Modal</button>
    <transition name="fade">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <p>This is my modal!</p>
          <Loader />
          <button @click="showModal = false" class="my-2 px-2 py-3 text-center text-primary-200 bg-secondary-300 rounded-md shadow-md">Close</button>
        </div>
      </div>
    </transition>
  </div>
    
  </div>
  <!-- Pagination -->
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  width: 50%;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>