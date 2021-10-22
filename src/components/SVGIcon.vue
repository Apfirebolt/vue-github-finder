<template>
  <svg class="icon-styles" :fill="fillColor" :stroke="color" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="path" />
  </svg>
</template>
<script>
export default {
  name: 'SVGIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#FFF',
      required: false,
    },
    fillColor: {
      type: String,
      default: 'none',
      required: false,
    },
  },
  data() {
    return {
      path: '',
      dimensions: '',
    };
  },
  mounted() {
    this.selectIcon();
  },
  methods: {
    selectIcon() {
      switch (this.name) {
        case 'briefcase':
          this.path = 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z';
          break;
        case 'home':
          this.path = 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6';
          break;
        case 'plus':
          this.path = 'M12 6v6m0 0v6m0-6h6m-6 0H6';
          break;
        case 'circle-check':
          this.path = 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
          break;
        case 'search':
          this.path = 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z';
          break;
        case 'office-building':
          this.path = 'M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z';
          break;
        default:
          this.path = '';
      }
    },
  },
};
</script>
<style scoped>
.icon-styles {
    height: 1.5rem; 
    width: 1.5rem;
    margin: auto 0.5rem;
}
</style>
