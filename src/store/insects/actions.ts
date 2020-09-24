import { ActionTree } from 'vuex';
import { InsectsState, RootState } from '@/interfaces/store';
import _insects from '@/utils/insects';

const actions: ActionTree<InsectsState, RootState> = {
  load: async ({ commit }): Promise<string> => {
    try {
      const insects = await _insects.fetchAll();
      commit('set', insects);
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject('insects load error');
    }
  },
  find: async ({ commit }, hour: string): Promise<string> => {
    try {
      const insects = await _insects.findHour(hour);
      commit('set', insects);
      commit('setHour', hour);
      if (insects.length === 0) {
        return Promise.reject('検索結果はありませんでした');
      }
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default actions;
