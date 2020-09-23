import { Insect } from './insects';

export interface RootState {
  root: boolean;
}

export interface AuthState {
  accessToken: string;
  client: string;
  uid: string;
}

export interface InsectsState {
  insects: Insect[];
}
