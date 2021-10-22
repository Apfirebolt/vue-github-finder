<template>
  <div v-if="user" class="user-container">
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        w="8"
        class="inner-container"
      >
        <vs-row>
          <vs-col w="6" vs-sm="12">
            <p class="heading">{{ user.name }}</p>
            <vs-row vs-justify="center" vs-align="center">
              <vs-button success class="auto-margin" style="width: 40%;">
                <icon-component name="briefcase" />
                {{ user.company }}
              </vs-button>
            </vs-row>
            <p>{{ user.bio }}</p>
            <vs-row>
              <vs-col w="3">
                <p>Followers</p>
                <vs-button size="small">
                  {{ user.followers }}
                </vs-button>
              </vs-col>
              <vs-col w="3">
                <p>Following</p>
                <vs-button size="small">
                  {{ user.following }}
                </vs-button>
              </vs-col>
              <vs-col w="3">
                <p>Public Repos</p>
                <vs-button size="small">
                  {{ user.public_repos }}
                </vs-button>
              </vs-col>
              <vs-col w="3">
                <p>Public Gists</p>
                <vs-button size="small">
                  {{ user.public_gists }}
                </vs-button>
              </vs-col>
            </vs-row>
            <p class="link-heading">{{ user.html_url }}</p>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
            <vs-card class="vuesax-card">
              <template #title>
                <h3 class="auto-margin">{{ user.login }}</h3>
              </template>
              <template #img>
                <img :src="user.avatar_url" alt="" />
              </template>
              <template #text>
                <vs-row>
                  <vs-button danger style="padding: 0.3rem" @click.prevent="$router.go(-1)">
                    Return Back
                  </vs-button>
                </vs-row>
              </template>
            </vs-card>
          </vs-col>
        </vs-row>
        <p class="sub-heading">Recent repositories of {{ user.name }}</p>
        <vs-row v-if="repos.length" class="repo-header">
          <vs-col w="4">
            Repo Name
          </vs-col>
          <vs-col w="8">
            Repo Url
          </vs-col>
        </vs-row>
        <vs-row v-for="repo in repos" :key="repo.id" class="repo-row">
          <vs-col w="4">
            {{ repo.name }}
          </vs-col>
          <vs-col w="8">
            {{ repo.url }}
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
  <h3 v-else>
    Loading...
  </h3>
</template>

<script>
import axios from "axios";
import IconComponent from "../components/SVGIcon.vue";

export default {
  name: "UserDetailPage",
  components: {
    IconComponent,
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
      Promise.all([
        await axios.get(`https://api.github.com/users/${username}`),
        await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
      ])
      .then((responses) => {
        this.user = responses[0].data;
        this.repos = responses[1].data;
      })
      .catch((errors) => {
        console.log(errors)
      })
    },
  },
};
</script>

<style scoped>
.user-container {
  padding: 1rem;
  width: 85%;
  margin: 1rem auto;
}
.inner-container {
  margin: auto;
  padding: 1rem;
}
.heading {
  font-size: 1.5rem;
  font-weight: 600;
}
.sub-heading {
  font-size: 1.2rem;
  font-weight: 600;
}
.repo-row {
  margin: 1rem auto;
  background: aliceblue;
  padding: 0.5rem;
}
.repo-header {
  text-align: center;
  margin: 1.5rem auto;
  font-size: 1.1rem;
  font-weight: 500;
  background: #CCC;
  padding: 1rem;
}
</style>
