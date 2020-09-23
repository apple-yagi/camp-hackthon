import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCompositionApi from '@vue/composition-api';
import * as VueGoogleMaps from 'vue2-google-maps';
import ActionCable from 'actioncable';

const cable = ActionCable.createConsumer(
  'https://campinsects.herokuapp.com/cable'
);

Vue.prototype.$cable = cable;

Vue.use(VueCompositionApi);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
    libraries: 'places',
    region: 'JP',
    language: 'ja',
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
