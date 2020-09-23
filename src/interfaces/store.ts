import { Insect } from './insects';

export interface RootState {
  root: boolean;
}

export interface AuthState {
  id: number | null;
  nickname: string;
  username: string;
  password: string;
}

export interface InsectsState {
  insects: Insect[];
}
