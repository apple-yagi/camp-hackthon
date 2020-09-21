import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/interfaces/store';
import { auth } from './auth';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    root: true,
  },
  modules: {
    auth,
  },
};

export default new Vuex.Store<RootState>(store);
