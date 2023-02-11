<template>
  <div v-if="products.length > 0">
    <h2 v-if="title">{{ title }}</h2>
    <ul class="catalog__list">
      <ProductItem v-for="(product, index) in products" :product="product" :key="index"/>
    </ul>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products', 'title'],
  components: { ProductItem },
};
</script>

<style scoped>
</style>
