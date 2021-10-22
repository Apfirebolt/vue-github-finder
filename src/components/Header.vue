<template>
  <vs-navbar class="navbar" color="#e8e4f7" center-collapsed v-model="active">
    <template #left>
      <h3>Github Finder</h3>
    </template>
    <template #right>
      <vs-button flat @click.prevent="goToPage('About')">About</vs-button>
      <vs-button @click.prevent="goToPage('Home')">Home</vs-button>
    </template>
  </vs-navbar>
</template>
<script>
export default {
  name: "Header",
  methods: {
    goToPage(urlName) {
      if (urlName) {
        this.$router.push({ name: urlName });
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  padding: 0.5rem;
}
</style>
