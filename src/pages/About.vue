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
  methods: {
    async searchUser(term) {
      const userResponse = await axios.get(
        `https://api.github.com/search/users?q=${term}`
      );
      if (userResponse) {
        this.users = userResponse.data.items;
        console.log(userResponse.items);
      }
    },
  },
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
