<template>
  <div>
    <p>Home page hello</p>
    <loader-component />
    <search-component @searchUser="searchUser" />
    <vs-row v-if="users.length" :w="12" class="gutter">
      <vs-col v-for="user in users" :key="user.id" w="4" class="card-container">
        <user-card :userObj="user" />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import LoaderComponent from "../components/Loader.vue";
import SearchComponent from "../components/Search.vue";
import UserCard from "../components/UserCard.vue";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    LoaderComponent,
    SearchComponent,
    UserCard,
  },
  data: () => ({
    users: [],
    loading: false,
  }),
  methods: {
    async searchUser(term) {
      this.loading = true;
      await axios
        .get(`https://api.github.com/search/users?q=${term}`)
        .then((userResponse) => {
          if (userResponse) {
            this.loading = false;
            this.users = userResponse.data.items;
            console.log(userResponse.items);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
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
