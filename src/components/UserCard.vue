<template>
  <vs-card class="vuesax-card">
    <template #title>
      <h3 class="auto-margin">{{ userObj.login }}</h3>
    </template>
    <template #img>
      <img :src="userObj.avatar_url" alt="" />
    </template>
    <template #text>
      <vs-button danger icon class="auto-margin" style="padding: 0.5rem">
        View
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
  name: "UserCardComponent",
  props: {
    userObj: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.vuesax-card {
    margin: 1rem auto;
}
.auto-margin {
    margin: 0.5rem auto;
    text-align: center;
}
</style>
