import { MutationTree } from 'vuex';
import { Insect } from '@/interfaces/insects';
import { InsectsState } from '@/interfaces/store';

const mutations: MutationTree<InsectsState> = {
  set: (state, payload: Insect[]) => {
    state.insects = payload;
  },
};

export default mutations;
