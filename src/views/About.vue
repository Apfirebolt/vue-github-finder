<script setup>
import { motion } from "motion-v";
import Loader from "../components/Loader.vue";
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
    <Loader />
  </div>
  <!-- Pagination -->
</template>
