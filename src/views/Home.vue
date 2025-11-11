<template>
  <section class="container mt-12 mx-auto px-4 py-8 max-w-7xl">
    <div class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8" data-aos="fade-up">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          GitHub User Finder
        </h1>
        <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Type the username of a GitHub user in the search box below to view their
          profile details. It would show details such as the number of public
          repositories, followers, following, and more.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto mb-8">
        <input
          type="text"
          v-model="searchTerm"
          @keyup.enter="searchUser(searchTerm, currentPage, itemsPerPage)"
          placeholder="Search for a GitHub user"
          class="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <button
          @click="searchUser(searchTerm, currentPage, itemsPerPage)"
          class="bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-secondary-200 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Search
        </button>
        <select
          v-model="itemsPerPage"
          class="px-5 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
      </div>

      <loader-component v-if="loading" />

      <div v-if="!loading && users.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="user in users"
          :key="user.id"
          class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 shadow-lg hover:shadow-2xl rounded-2xl p-6 transform hover:-translate-y-2 transition-all duration-300"
        >
          <div class="flex flex-col items-center">
            <img
              :src="user.avatar_url"
              alt="User Avatar"
              class="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
            />
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mt-4 text-center">
              {{ user.login }}
            </h3>
            <a
              :href="user.html_url"
              target="_blank"
              class="text-primary-100 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mt-2 inline-flex items-center gap-1 transition-colors"
            >
              View Profile
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button
              @click="goToDetails(user.login)"
              class="mt-4 w-full bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-secondary-200 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <div v-if="!loading && users.length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          No users found. Try a different search term.
        </p>
      </div>
    </div>

    <pagination
      v-if="users.length > 0"
      :currentPage="currentPage"
      :numberOfItemsPerPage="itemsPerPage"
      :total="totalItems"
      @goToNextPage="goToNextPage"
      @goToPreviousPage="goToPreviousPage"
      class="mt-8"
    />
  </section>
</template>

<script>
import axios from "axios";
import aos from "aos";
import "aos/dist/aos.css";
import Pagination from "../components/Pagination.vue";
import LoaderComponent from "../components/Loader.vue";

export default {
  name: "HomePage",
  data: () => ({
    users: [],
    loading: false,
    searchTerm: "vue",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  }),
  components: {
    LoaderComponent,
    Pagination,
  },
  mounted() {
    aos.init();
    this.searchUser(this.searchTerm, this.currentPage, this.itemsPerPage);
  },
  methods: {
    async searchUser(term, current_page, per_page) {
      this.loading = true;
      await axios
        .get(
          `https://api.github.com/search/users?q=${term}&per_page=${per_page}&page=${current_page}`
        )
        .then((userResponse) => {
          if (userResponse) {
            this.loading = false;
            this.users = userResponse.data.items;
            this.totalItems = userResponse.data.total_count;
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
    goToNextPage() {
      this.currentPage += 1;
      this.searchUser(this.searchTerm, this.currentPage, this.itemsPerPage);
    },
    goToPreviousPage() {
      this.currentPage -= 1;
      this.searchUser(this.searchTerm, this.currentPage, this.itemsPerPage);
    },
  },
  watch: {
    itemsPerPage(value) {
      this.searchUser(this.searchTerm, this.currentPage, value);
    },
  },
};
</script>
