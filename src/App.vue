<template>
  <div>
    <component :is="currentPageComponent" :page-params="currentPageParams"/>
  </div>
</template>

<script>
import eventBus from '@/eventBus';

import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue'; 

const routes = {
  'main': 'MainPage',
  'product': ProductPage
}
export default {
  components: { MainPage, ProductPage, NotFoundPage},
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {}
    };
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName
      this.currentPageParams = pageParams || {}
    }
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams))
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage'
    }
  }
};

</script>
<style lang="stylus">
</style>
