import { Insect } from '@/interfaces/insects';
import { User } from '@/interfaces/user';
import axios, { AxiosResponse } from 'axios';
const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/';

export default {
  async show(userId: number): Promise<User> {
    try {
      const res: AxiosResponse<User> = await axios.get(
        `${BaseUrl}users/${userId}`
      );
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject('不明なユーザ');
    }
  },

  async loadInsects(userId: number): Promise<Insect[]> {
    try {
      const res: AxiosResponse<Insect[]> = await axios.get(
        `${BaseUrl}users/${userId}/insects`
      );
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject('データの取得に失敗しました');
    }
  },
};
