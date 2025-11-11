<template>
  <loader-component v-if="loading" color="blue" />
  <div class="user-container mt-16 max-w-6xl mx-auto px-4" v-else>
    <div
      class="user-info bg-white dark:bg-primary-200 dark:text-white shadow-xl rounded-xl p-8 mb-8"
    >
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          :src="user.avatar_url"
          alt="User Avatar"
          class="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-lg"
        />
        <div class="flex-1 text-center md:text-left">
          <h3 class="text-3xl font-bold mb-2">{{ user.name }}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-lg mb-3">
            @{{ user.login }}
          </p>
          <p
            v-if="user.bio"
            class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
          >
            {{ user.bio }}
          </p>
          <div
            v-if="user.email"
            class="flex items-center justify-center md:justify-start gap-2 mb-4"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
              ></path>
              <path
                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
              ></path>
            </svg>
            <span class="text-blue-600 dark:text-blue-400">{{
              user.email
            }}</span>
          </div>
          <a
            :href="user.html_url"
            target="_blank"
            class="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 font-medium shadow-md"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            View Profile
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div
          class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 text-center shadow-sm"
        >
          <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {{ user.followers }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
            Followers
          </p>
        </div>
        <div
          class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 text-center shadow-sm"
        >
          <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {{ user.following }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
            Following
          </p>
        </div>
        <div
          class="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 text-center shadow-sm"
        >
          <p class="text-3xl font-bold text-green-600 dark:text-green-400">
            {{ user.public_repos }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
            Repositories
          </p>
        </div>
        <div
          class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 text-center shadow-sm"
        >
          <p class="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {{ user.public_gists }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
            Gists
          </p>
        </div>
      </div>

      <div
        v-if="user.location"
        class="mt-6 flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="font-medium">{{ user.location }}</span>
      </div>
    </div>

    <div class="repos-section">
      <h3
        class="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
      >
        Latest Repositories
      </h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="repo in repos"
          :key="repo.id"
          class="bg-white dark:bg-primary-300 dark:text-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-200 border border-gray-100 dark:border-gray-700"
        >
          <h4 class="text-xl font-bold mb-3 text-gray-800 dark:text-white">
            {{ repo.name }}
          </h4>
          <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {{ repo.description || "No description available" }}
          </p>
          <a
            :href="repo.html_url"
            target="_blank"
            class="inline-flex items-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
          >
            View Repository
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoaderComponent from "../components/Loader.vue";

export default {
  name: "UserDetailPage",
  components: {
    LoaderComponent,
  },
  data: () => ({
    user: {},
    repos: [],
    loading: false,
  }),
  mounted() {
    this.getUserDetails(this.$route.params.username);
  },
  methods: {
    async getUserDetails(username) {
      this.loading = true;
      Promise.all([
        await axios.get(`https://api.github.com/users/${username}`),
        await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
        ),
      ])
        .then((responses) => {
          this.loading = false;
          this.user = responses[0].data;
          this.repos = responses[1].data;
        })
        .catch((errors) => {
          this.loading = false;
          console.log(errors);
        });
    },
  },
};
</script>
