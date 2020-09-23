import { MutationTree } from 'vuex';
import { AuthState } from '@/interfaces/store';

const mutations: MutationTree<AuthState> = {
  set: (state, payload: AuthState) => {
    state.id = payload.id;
    state.username = payload.username;
    state.nickname = payload.nickname;
    state.password = payload.password;
  },
  reset: (state) => {
    state.id = null;
    state.username = '';
    state.nickname = '';
    state.password = '';
  },
};

export default mutations;
