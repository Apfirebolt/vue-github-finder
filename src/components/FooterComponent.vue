<template>
  <footer class="py-4 bg-red-700">
    <div class="container mx-auto px-4">
      <p class="text-center text-light-blue text-sm">
        &copy; {{ currentYear }} Reddit Clone - A Full Fledged Reddit Clone Built with Vue 3 and Tailwind CSS
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
