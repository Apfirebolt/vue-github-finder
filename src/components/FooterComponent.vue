<template>
  <footer class="py-4 bg-primary-200 text-secondary-300 dark:bg-slate-700 dark:text-white">
    <div class="container mx-auto px-4">
      <p class="text-center text-sm">
        &copy; {{ currentYear }} Github Finder Built with Vue 3 and Tailwind CSS
      </p>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear,
    }
  },
})
</script>

<style>
/* Add any custom styles here */
</style>
