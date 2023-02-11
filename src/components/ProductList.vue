<template>
  <ul class="catalog__list">
    <li v-for="(product, index) in products" class="catalog__item" :key="index">
      <a class="catalog__pic" href="#">
        <img :src="product.image" :alt="product.title">
      </a>
      <h3 class="catalog__title">
        <a href="#">
          {{product.title}}
        </a>
      </h3>
      <span class="catalog__price">
        {{product.price}} ₽
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['products'],
};
</script>

<style scoped>
</style>
