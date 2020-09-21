import { MutationTree } from 'vuex';
import { AuthState } from '@/interfaces/store';

const mutations: MutationTree<AuthState> = {
  set: (state, payload: AuthState) => {
    state.accessToken = payload.accessToken;
    state.client = payload.client;
    state.uid = payload.uid;
  },
  reset: (state) => {
    state.accessToken = '';
    state.client = '';
    state.uid = '';
  },
};

export default mutations;
