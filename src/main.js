// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import {currency} from './util/currency'

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueLazyLoad, {
  loading: 'static/loading-svg/loading-bars.svg'
});

Vue.filter('currency', currency);

const store = new Vuex.Store({
  state: {
    nickname: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo(state, nickname) {
      state.nickname = nickname;
    },
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
