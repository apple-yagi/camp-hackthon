import { ActionTree } from 'vuex';
import { AuthState, RootState } from '@/interfaces/store';
import { LoginInfo } from '@/interfaces/login-info';
import _auth from '@/utils/auth';

const actions: ActionTree<AuthState, RootState> = {
  login: async ({ commit }, loginInfo: LoginInfo) => {
    try {
      const auth = _auth.login(loginInfo);
      commit('set', auth);
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject('error');
    }
  },
  logout: async ({ commit }) => {
    commit('reset');
  },
};

export default actions;
