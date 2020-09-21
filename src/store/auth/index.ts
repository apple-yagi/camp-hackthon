import { Module } from 'vuex';
import { RootState, AuthState } from '@/interfaces/store';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: AuthState = {
  accessToken: '',
  client: '',
  uid: '',
};

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
