<template>
    <loader-component v-if="loading" color="blue" />
    <div class="user-container" v-else>
        <div class="user-info bg-white shadow-md rounded-lg p-6 text-center">
            <img :src="user.avatar_url" alt="User Avatar" class="w-48 h-48 rounded-full mx-auto">
            <h3 class="text-2xl font-semibold mt-4">{{ user.name }}</h3>
            <p v-if="user.email">
                Email Address: <span class="text-blue-500">{{ user.email }}</span>
            </p>
            <p class="text-gray-600">{{ user.login }}</p>
            <p class="text-gray-600 mt-2">{{ user.bio }}</p>
            <div class="flex flex-col items-center mt-4 space-y-2 shadow-md rounded-lg p-4">
                <div class="flex space-x-4 bg-secondary-100 w-1/2 mx-auto justify-center text-secondary-300 px-2 py-3">
                    <p class="font-semibold">Followers: <span class="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">{{ user.followers }}</span></p>
                    <p class="font-semibold">Following: <span class="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">{{ user.following }}</span></p>
                </div>
                <div class="flex space-x-4 bg-secondary-100 w-1/2 mx-auto justify-center text-secondary-300 px-2 py-3">
                    <p class="font-semibold">Public Repos: <span class="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">{{ user.public_repos }}</span></p>
                    <p class="font-semibold">Public Gists: <span class="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">{{ user.public_gists }}</span></p>
                </div>
                <div class="flex space-x-4 bg-secondary-100 w-1/2 mx-auto justify-center text-secondary-300 px-2 py-3">
                    <p class="font-semibold">Country: <span class="text-primary-100 rounded-md px-2 py-1 bg-secondary-300">{{ user.location }}</span></p>
                </div>
            </div>
            <a :href="user.html_url" target="_blank" class="text-secondary-300 bg-primary-200 rounded-md shadow-md-primary-300 p-2 mt-4 inline-block">View Profile</a>
        </div>
        <div class="container mx-auto my-4">
            <h3 class="text-2xl font-semibold text-center">Latest Repositories</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                <div v-for="repo in repos" :key="repo.id" class="bg-white shadow-md rounded-lg p-4">
                    <h3 class="text-xl font-semibold">{{ repo.name }}</h3>
                    <p class="text-gray-600">{{ repo.description }}</p>
                    <a :href="repo.html_url" target="_blank" class="text-secondary-300 bg-primary-200 px-2 py-1 rounded-sm shadow-md mt-2 inline-block">View Repo</a>
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
          await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
        ])
        .then((responses) => {
          this.loading = false;
          this.user = responses[0].data;
          this.repos = responses[1].data;
        })
        .catch((errors) => {
          this.loading = false;
          console.log(errors)
        })
      },
    },
  };
  </script>
  