import { LoginInfo } from '@/interfaces/login-info';
import { AuthState } from '@/interfaces/store';

export default {
  login(loginInfo: LoginInfo): AuthState {
    const authInfo: AuthState = {
      accessToken: '1111',
      client: '1111',
      uid: '1111',
    };
    return authInfo;
  },
};
