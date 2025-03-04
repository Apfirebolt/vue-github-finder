<template>
  <nav
    class="container mx-auto px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        {{ " " }}
        <span class="font-medium">{{ showCurrentIndex }}</span>
        {{ " " }}
        to
        {{ " " }}
        <span class="font-medium">
          {{
            currentPage * numberOfItemsPerPage < total
              ? currentPage * numberOfItemsPerPage
              : total
          }}
        </span>
        {{ " " }}
        of
        {{ " " }}
        <span class="font-medium">{{ total }}</span>
        {{ " " }}
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <button
        @click="previosPageHandler"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-secondary-300 bg-primary-300 hover:bg-primary-100 transition-all duration-200"
      >
        Previous
      </button>
      <button
        @click="nextPageHandler"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-secondary-300 bg-primary-300 hover:bg-primary-100 transition-all duration-200"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    numberOfItemsPerPage: Number,
    total: Number,
  },
  emits: ["goToPreviousPage", "goToNextPage"],
  data() {
    return {};
  },
  computed: {
    showCurrentIndex() {
      if (this.currentPage === 1) {
        return 1;
      } else {
        return (
          this.currentPage * this.numberOfItemsPerPage -
          this.numberOfItemsPerPage +
          1
        );
      }
    },
  },
  methods: {
    previosPageHandler() {
      this.$emit("goToPreviousPage");
    },
    nextPageHandler() {
      this.$emit("goToNextPage");
    },
  },
};
</script>
