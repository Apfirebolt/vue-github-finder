<template>
  <section class="shadow sm:rounded-lg mt-10" id="about">
    <div class="px-4 py-5 sm:p-6" data-aos="fade-up">
      <p class="text-center mt-10">
        Type the username of a GitHub user in the search box below to view their
        profile details. It would show details such as the number of public
        repositories, followers, following, and more.
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
        <select
          v-model="itemsPerPage"
          class="ml-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <loader-component v-if="loading" />
      <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="user in users"
          :key="user.id"
          class="bg-white dark:bg-primary-300 dark:text-secondary-300 shadow-md rounded-lg p-4"
        >
          <img
            :src="user.avatar_url"
            alt="User Avatar"
            class="w-16 h-16 rounded-full mx-auto"
          />
          <h3 class="text-xl text-center mt-4">{{ user.login }}</h3>
          <a
            :href="user.html_url"
            target="_blank"
            class="text-secondary-200 dark:text-white dark:bg-primary-200 dark:w-1/2 dark:mx-auto dark:shadow-md dark:rounded-md dark:p-2 text-center block mt-2"
            >View Profile</a
          >
          <button
            @click="goToDetails(user.login)"
            class="mt-4 bg-primary-100 hover:bg-primary-300 dark:text-white transition-all duration-200 text-white py-2 px-4 rounded block mx-auto"
          >
            Go to Details
          </button>
        </div>
      </div>
    </div>
    <pagination
      v-if="users.length > 0"
      :currentPage="currentPage"
      :numberOfItemsPerPage="itemsPerPage"
      :total="totalItems"
      @goToNextPage="goToNextPage"
      @goToPreviousPage="goToPreviousPage"
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
