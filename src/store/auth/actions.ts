import { ActionTree } from 'vuex';
import { AuthState, RootState } from '@/interfaces/store';
import { SigninInfo } from '@/interfaces/signin-info';
import { SignupInfo } from '@/interfaces/signup-info';
import _auth from '@/utils/auth';

const actions: ActionTree<AuthState, RootState> = {
  signIn: async ({ commit }, signinInfo: SigninInfo) => {
    try {
      const auth = await _auth.signIn(signinInfo);
      commit('set', auth);
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject(error);
    }
  },
  signUp: async ({ commit }, signupInfo: SignupInfo) => {
    try {
      const auth = await _auth.signUp(signupInfo);
      commit('set', auth);
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default actions;
