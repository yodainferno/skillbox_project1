<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors">
      <li class="colors__item" v-for="productColor in product.colors">
        <label class="colors__label">
          <input v-model="color" class="colors__radio sr-only" type="radio" :value="productColor.code">
          <span class="colors__value" :style="{['background-color']: productColor.code}"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  filters: {
    numberFormat
  },
  data() {
    return {
      color: null,
    };
  },
  created() {
    this.color = this.product.colors[0].code;
  }
};
</script>

<style scoped>
input[type="radio"]:checked {
  margin: 1rem;
}
.colors__radio:checked~.colors__value::before {
  outline: 3px solid #3f6502;
}
</style>
