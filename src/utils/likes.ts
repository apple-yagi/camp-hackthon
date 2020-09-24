import { Likes } from '@/interfaces/likes';
import axios, { AxiosResponse } from 'axios';
const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

export default {
  load(insectId: number): Promise<Likes[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse<Likes[]> = await axios.get(
          `${BaseUrl}insects/${insectId}/likes`
        );
        resolve(res.data);
      } catch (error) {
        reject('いいねを取得できませんでした');
      }
    });
  },
  likes(insectId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${BaseUrl}insects/${insectId}/likes`);
        resolve(res.data);
      } catch (error) {
        reject('いいねに失敗しました');
      }
    });
  },
};
