import Vue from "vue";
import Vuex from "vuex";

// import products from "@/data/products";

import axios from "axios";
import { API_BASE_URL } from "@/config";

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        cartProducts: null,

        userAccessKey: null,
        cartProductsData: []
    },
    mutations: {
        // addProductToCart(state, {productId, amount}) {
        //     const item = state.cartProducts.find(el => el.productId === productId);

        //     if (item) {
        //         item.amount += amount
        //     } else {
        //         state.cartProducts.push({
        //             productId,
        //             amount
        //         })
        //     }
        // },
        updateCartProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(el => el.productId === productId);
            if (item) {
                item.amount = amount
            }
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter((el) => el.productId !== productId);
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey;
        },
        updateCartProductsData(state, items) {
            state.cartProductsData = items;
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity
                };
            })
        }
    },
    getters: {
        cartDetailProducts(state) {
            if (!state.cartProducts) {
                return null
            }
            return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(p => p.product.id === item.productId).product

                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
                }
            })
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => acc + (item.product.price * item.amount), 0)
        },
    },
    actions: {
        loadCart(context) {
            axios
                .get(API_BASE_URL + '/api/baskets', {
                    params: {
                       userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    if (!context.state.userAccessKey) {
                        // если состояния нет - записать (сохранить)
                        localStorage.setItem('updateUserAccessKey', response.data.user.accessKey);
                        context.commit('updateUserAccessKey', response.data.user.accessKey);
                    }
                    context.commit('updateCartProductsData', response.data.items); // синхронная операция

                    // синхронизация
                    context.commit('syncCartProducts');
                });
        },
        async addProductToCart(context, {productId, amount}) {
            return axios.post(API_BASE_URL + '/api/baskets/products', {
                productId: productId,
                quantity: amount,
            }, {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                context.commit('updateCartProductsData', response.data.items);
                context.commit('syncCartProducts');
            });
        },
        async updateCartProductAmount(context, {productId, amount}) {
            context.commit('updateCartProductAmount', {productId, amount}) // не дожидаясь меняем данные сайта

            if (amount < 1) {
                return;
            }
            return axios.put(API_BASE_URL + '/api/baskets/products', {
                productId: productId,
                quantity: amount,
            }, {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                context.commit('updateCartProductsData', response.data.items);
            })
            .catch(() => {
                context.commit('syncCartProducts'); // на случай ошибки - вернуть
            })
        },
        async deleteCartProduct(context, productId) {
            context.commit('deleteCartProduct', productId) // не дожидаясь меняем данные сайта

            return axios.delete(API_BASE_URL + `/api/baskets/products`, {
                data: {
                    productId: productId
                },
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                context.commit('updateCartProductsData', response.data.items);
            })
            .catch(() => {
                context.commit('syncCartProducts'); // на случай ошибки - вернуть
            })
        },
    }
});