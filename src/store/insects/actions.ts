import { ActionTree } from 'vuex';
import { InsectsState, RootState } from '@/interfaces/store';
import { Insect } from '@/interfaces/insects';
import _insects from '@/utils/insects';

const actions: ActionTree<InsectsState, RootState> = {
  load: async ({ commit }, insects: Insect[]): Promise<string> => {
    try {
      const insects = await _insects.fetchAll();
      commit('set', insects);
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject('insects load error');
    }
  },
};

export default actions;
