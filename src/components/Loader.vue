<template>
  <div class="loader">
    <icon-component name="plus" color="blue" />
  </div>
</template>

<script>
import IconComponent from './SVGIcon.vue';
export default {
  name: "LoaderComponent",
  components: {
    IconComponent,
  }
};
</script>

<style scoped>
.loader {
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-animation: spin 2s linear infinite;
  -moz-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
