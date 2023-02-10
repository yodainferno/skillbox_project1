import Vue from 'vue';
import App from './App.vue';

import {string_first_name, string_last_name} from './data'
import myFoo from './data_function'

Vue.config.productionTip = false;

myFoo(string_first_name)
myFoo(string_last_name)

new Vue({
  render: (h) => h(App),
}).$mount('#app');
