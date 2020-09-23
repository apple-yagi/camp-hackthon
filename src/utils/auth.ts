import axios, { AxiosResponse } from 'axios';
import { SigninInfo } from '@/interfaces/signin-info';
import { AuthState } from '@/interfaces/store';
import { SignupInfo } from '@/interfaces/signup-info';
const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/';

export default {
  async signIn(signinInfo: SigninInfo): Promise<AuthState> {
    try {
      const res: AxiosResponse<AuthState> = await axios.post(
        `${BaseUrl}users/sign_in`,
        signinInfo
      );
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject('認証に失敗しました');
    }
  },
  async signUp(signupInfo: SignupInfo): Promise<AuthState> {
    try {
      const res: AxiosResponse<AuthState> = await axios.post(
        `${BaseUrl}users/sign_up`,
        signupInfo
      );
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject('ユーザーの作成に失敗しました');
    }
  },
};
