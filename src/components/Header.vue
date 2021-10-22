<template>
  <vs-row :w="10" class="gutter success">
    <vs-col :w="6" type="flex" vs-justify="center" vs-align="center">
      <h3>Github Finder</h3>
      <img src="https://img.icons8.com/material-rounded/24/000000/github.png" height="50" width="50" style="margin-left: 0.5rem;"/>
    </vs-col>
    <vs-col :w="6" class="nav-right">
      <vs-button flat size="large" @click.prevent="goToPage('About')">About</vs-button>
      <vs-button size="large" @click.prevent="goToPage('Home')">Home</vs-button>
    </vs-col>
  </vs-row>
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
.gutter {
  width: 90%;
  padding: 0.5rem 1rem;
  background: aliceblue;
  margin: auto;
}
.navbar {
  padding: 0.5rem;
}
.nav-right {
  display: flex !important;
  justify-content: right !important;
}
</style>
