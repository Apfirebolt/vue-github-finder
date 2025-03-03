<template>
  <div class="text-secondary-100 bg-secondary-300">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
</script>
