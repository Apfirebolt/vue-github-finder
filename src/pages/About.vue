<template>
  <div>
    <loader-component />
    <p>About Page</p>
  </div>
</template>

<script>
import LoaderComponent from "../components/Loader.vue";
export default {
  name: "HomePage",
  components: {
    LoaderComponent,
  },
  data: () => ({
    users: [],
  }),
};
</script>

<style scoped>
.gutter {
  padding: 0.5rem;
  margin: 1rem auto;
}
.card-container {
  display: flex !important;
  justify-content: center !important;
}
</style>
