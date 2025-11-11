<template>
  <footer
    class="mt-auto py-8 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 dark:from-slate-800 dark:to-slate-900"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <!-- About Section -->
        <div>
          <h3 class="text-xl font-bold text-white mb-3">GitHub Finder</h3>
          <p class="text-sm text-gray-400">
            Search and discover GitHub users and repositories with ease. Built
            with modern web technologies.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold text-white mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="/" class="hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="/about" class="hover:text-white transition-colors"
                >About</a
              >
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                class="hover:text-white transition-colors"
                >GitHub</a
              >
            </li>
          </ul>
        </div>

        <!-- Tech Stack -->
        <div>
          <h3 class="text-xl font-bold text-white mb-3">Built With</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>Vue 3 - Progressive Framework</li>
            <li>Tailwind CSS - Utility-first CSS</li>
            <li>GitHub API - Data Source</li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-700 pt-6">
        <p class="text-center text-sm text-gray-400">
          &copy; {{ currentYear }} GitHub Finder. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  setup() {
    const currentYear = computed(() => new Date().getFullYear());

    return {
      currentYear,
    };
  },
});
</script>

<style>
/* Add any custom styles here */
</style>
