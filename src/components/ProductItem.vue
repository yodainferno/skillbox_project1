<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="goToPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors">
      <li class="colors__item">
        <label class="colors__label">
          <input v-model="color" class="colors__radio sr-only" type="radio" value="#73B6EA">
          <span class="colors__value" style="background-color: #73B6EA;"></span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input v-model="color" class="colors__radio sr-only" type="radio" value="#FFBE15">
          <span class="colors__value" style="background-color: #FFBE15;"></span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input v-model="color" class="colors__radio sr-only" type="radio" value="#939393">
          <span class="colors__value" style="background-color: #939393;"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  filters: {
    numberFormat
  },
  data() {
    return {
      color: '#73B6EA',
    };
  },
  methods: {
    goToPage, // определение глобальной функции в методах
  },
};
</script>

<style scoped>
input[type="radio"]:checked {
  margin: 1rem;
}
.colors__radio:checked~.colors__value::before {
  border: 1.5px solid #00f
}
</style>
