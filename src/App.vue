<template>
  <section class="catalog">
    <ul class="catalog__list">

      <ProductList :products="products" :title="title"/>
      <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
    </ul>
  </section>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      title: 'Каталог моих товаров',
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};

</script>
<style lang="stylus">
</style>
