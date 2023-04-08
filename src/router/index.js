// импортируем Vue и VueRouter
import Vue from "vue";
import VueRouter from "vue-router";

// импортируем компоненты страниц
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage'
import NotFoundPage from '@/pages/NotFoundPage'

// сообщаем Vue о намерении использовать VueRouter
Vue.use(VueRouter);

// массив маршрутов, где каждый маршрут представляет объект со свойствами name, component и path
const routes = [
    { name: 'main', component: MainPage, path: '/' },
    { name: 'product', component: ProductPage, path: '/product/:id' },
    { name: 'cart', component: CartPage, path: '/cart' },
    { name: 'order', component: OrderPage, path: '/order' },
    { name: 'notFound', component: NotFoundPage, path: '*' },
];

// создаем экземпляр VueRouter и передаем массив маршрутов в качестве свойства
const router = new VueRouter({
    routes
});

// экспортируем экземпляр, чтобы его можно было использовать в приложении
export default router;
