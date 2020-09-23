import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { RootState } from '@/interfaces/store';
import { auth } from './auth';
import { insects } from './insects';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    root: true,
  },
  modules: {
    auth,
    insects,
  },
  plugins: [
    createPersistedState({
      key: 'Authenticate',
      paths: ['auth'],
      storage: window.sessionStorage,
    }),
  ],
};

export default new Vuex.Store<RootState>(store);
