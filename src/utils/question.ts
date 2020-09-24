import { Insect } from '@/interfaces/insects';
import axios, { AxiosResponse } from 'axios';
const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/';

export default {
  loadAll(): Promise<Insect[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse<Insect[]> = await axios.get(
          `${BaseUrl}insects/question`
        );
        resolve(res.data);
      } catch (error) {
        reject('データの取得に失敗しました');
      }
    });
  },
  destroy(insectId: number): Promise<Insect> {
    return new Promise(async (resolve, reject) => {
      try {
        const res: AxiosResponse<Insect> = await axios.patch(
          `${BaseUrl}insects/destroy_question/${insectId}`
        );
        resolve(res.data);
      } catch (error) {
        reject('更新に失敗しました');
      }
    });
  },
};
