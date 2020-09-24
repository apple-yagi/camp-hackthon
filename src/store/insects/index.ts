import { Module } from 'vuex';
import { InsectsState, RootState } from '@/interfaces/store';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: InsectsState = {
  insects: [],
  hour: 'all',
};

export const insects: Module<InsectsState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
