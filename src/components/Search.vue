<template>
  <vs-row :w="10" class="gutter">
    <vs-col :w="10">
      <vs-input v-model="searchText" placeholder="Search Github User" class="custom-input">
      </vs-input>
    </vs-col>
    <vs-col :w="2">
      <vs-button flat @click.prevent="$emit('searchUser', searchText)" style="padding: 0.5rem;">
        Search User
      </vs-button>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  data: () => ({
    searchText: "",
  }),
};
</script>

<style>
.gutter {
    width: 80%;
}

.vs-input {
    padding: 1rem !important;
    width: 90%;
}
</style>
