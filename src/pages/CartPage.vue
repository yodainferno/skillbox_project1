<template>
    <div class="content container">
        <div class="content__top">
        <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html">
                Каталог
            </a>
            </li>
            <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
                Корзина
            </a>
            </li>
        </ul>

        <h1 class="content__title">
            Корзина
        </h1>
        <div v-if="products">
            <span class="content__info">
                {{ productCountText }}
            </span>
            <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <ul class="cart__list">
                        <CartItem :item="item" v-for="item in products" :key="item.productId"/>
                    </ul>
                </div>

                <div class="cart__block">
                <p class="cart__desc">
                    Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
                </p>
                <p class="cart__price">
                    Итого: <span>{{ totalPrice | numberFormat}} ₽</span>
                </p>

                <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit">
                    Оформить заказ
                </router-link>
                </div>
            </form>
            </section>
        </div>
        <div style="display: flex; align-items: center;" v-else>            
            <BaseLoader/>
            <div style="margin-left: 1rem;">Загрузка товаров...</div>

        </div>
    </div>
</div>
</template>

<script>
import CartItem from '@/components/CartItem';
import BaseLoader from '@/components/BaseLoader'
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex'

export default {
    components: {CartItem, BaseLoader},
    filters: {
        numberFormat
    },
    computed: {
        ...mapGetters({
            products: 'cartDetailProducts',
            totalPrice: 'cartTotalPrice'
        }),
        productCountText() {
            return `Товаров: ${this.products.length}`
        }
    }
}
</script>