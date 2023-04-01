<template>
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>
  
      <div class="content__catalog">
        <ProductFilter
          :price-from.sync="filterPriceFrom"
          :price-to.sync="filterPriceTo"
          :category-id.sync="filterCategoryId"
          :color.sync="filterColor"
        />
        <div style="display: flex; align-items: center;" v-if="productIsLoading">
          <BaseLoader/>
          <div style="margin-left: 1rem;">Загрузка товаров...</div>
          
        </div>
        <div v-else-if="productLoadingFailed">Ошибка загрузки <button @click="loadProducts">Повторить</button></div>
        <section v-else class="catalog">
          <ul class="catalog__list">
            <ProductList :products="products" :title="title"/>
            <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
          </ul>
        </section>
      </div>
    </main>
  </template>
  
  <script>
  // import products from '@/data/products';
  import ProductList from '@/components/ProductList.vue';
  import BaseLoader from '@/components/BaseLoader.vue';
  import BasePagination from '@/components/BasePagination.vue';
  import ProductFilter from '@/components/ProductFilter.vue';
  import axios from 'axios';
  import { API_BASE_URL } from '@/config';

  export default {
    components: { BaseLoader, ProductList, BasePagination, ProductFilter },
    data() {
      return {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterColor: 0,
         
        page: 1,
        productsPerPage: 3,
        title: 'Каталог моих товаров',

        productsData: null,
        productIsLoading: false,
        productLoadingFailed: false,
      };
    },
    computed: {
      // filteredProducts() {
      //   let filteredProducts = products
  
      //   if (this.filterPriceFrom > 0) {
      //     filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
      //   }
      //   if (this.filterPriceTo > 0) {
      //     filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
      //   }
      //   if (this.filterCategoryId) {
      //     filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId);
      //   }
  
      //   return filteredProducts
      // },
      products() {
        // const offset = (this.page - 1) * this.productsPerPage;
        // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
        return this.productsData
          ? this.productsData.items.map(product => {
            return {
              ...product,
              image: product.image.file.url
            }
          })
          : []
      },
      countProducts() {
        return this.productsData ? this.productsData.pagination.total : 0
        // return this.filteredProducts.length;
      },
    },
    methods: {
      loadProducts() {
        this.productIsLoading = true;
        this.productLoadingFailed = false;

        clearTimeout(this.loadProductsTimer);

        this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + '/api/products', {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColor
            }
          })
          .then(reponse => this.productsData = reponse.data)
          .catch(() => this.productLoadingFailed = true)
          .then(() => this.productIsLoading = false)
        }, 0);
      }
    },
    created() {
      this.loadProducts()
    },
    watch: {
      page() {
        this.loadProducts()
      },
      filterCategoryId() {
        this.loadProducts()
      },
      filterColor() {
        this.loadProducts()
      },
      filterPriceFrom() {
        this.loadProducts()
      },
      filterPriceTo() {
        this.loadProducts()
      },
    }
  };
  
  </script>
  <style lang="stylus">
  </style>
  