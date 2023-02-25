<template>
  <li class="catalog__item" :key="product.title">
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
</template>

<script>
export default {
  props: ['product'],
};
</script>

<style scoped>
</style>
