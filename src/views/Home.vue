<template>
  <section class="shadow sm:rounded-lg" id="about">
    <div class="px-4 py-5 sm:p-6" data-aos="fade-up">
      <h2 class="text-3xl my-2 py-2 text-center text-jet-black">HOME</h2>
      <p class="text-center">
        Type the username of a GitHub user in the search box below to view their profile details. It would show details such as the number of public repositories, followers, following, and more.
      </p>

      <div class="mt-6 flex justify-center mx-auto w-1/2 items-center">
        <input
            type="text"
            v-model="searchTerm"
            @keyup.enter="searchUser(searchTerm)"
            placeholder="Search for a GitHub user"
            class="w-full mx-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="searchUser(searchTerm)"
            class="bg-primary-300 text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-100"
          >
            Search
          </button>
          <select v-model="itemsPerPage" class="ml-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
      </div>
      <loader-component v-if="loading" />
      <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="user in users" :key="user.id" class="bg-white dark:bg-primary-300 dark:text-secondary-300 shadow-md rounded-lg p-4">
          <img :src="user.avatar_url" alt="User Avatar" class="w-16 h-16 rounded-full mx-auto">
          <h3 class="text-xl text-center mt-4">{{ user.login }}</h3>
          <a :href="user.html_url" target="_blank" class="text-secondary-200 dark:text-white dark:bg-primary-200 dark:w-1/2 dark:mx-auto dark:shadow-md dark:rounded-md dark:p-2 text-center block mt-2">View Profile</a>
          <button @click="goToDetails(user.login)" class="mt-4 bg-primary-100 hover:bg-primary-300 dark:text-white transition-all duration-200 text-white py-2 px-4 rounded block mx-auto">
            Go to Details
          </button>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axios from "axios";
import aos from "aos";
import "aos/dist/aos.css";
import LoaderComponent from "../components/Loader.vue";

export default {
  name: "HomePage",
  data: () => ({
    users: [],
    loading: false,
    searchTerm: "vue",
    itemsPerPage: 10,
  }),
  components: {
    LoaderComponent,
  },
  mounted() {
    aos.init();
    this.searchUser(this.searchTerm, this.itemsPerPage);
  },
  methods: {
    async searchUser(term, per_page) {
      this.loading = true;
      await axios
        .get(`https://api.github.com/search/users?q=${term}&per_page=${per_page}`)
        .then((userResponse) => {
          if (userResponse) {
            this.loading = false;
            this.users = userResponse.data.items;
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    goToDetails(username) {
      this.$router.push({ name: "UserDetail", params: { username } });
    },
  },
  watch: {
    itemsPerPage(value) {
      this.searchUser(this.searchTerm, value);
    },
  },
};
</script>
