import axios, { AxiosResponse } from 'axios';
import { Comment } from '@/interfaces/comments';
const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/';

export default {
  async fetchAll(insect_id: number): Promise<Comment[]> {
    try {
      const res: AxiosResponse<Comment[]> = await axios.get(
        `${BaseUrl}${insect_id}/comments`
      );
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error.message);
    }
  },
  async create(insect_id: number, comment: Comment): Promise<string> {
    try {
      const res = await axios.post(`${BaseUrl}${insect_id}/comments`, comment);
      return Promise.resolve('success comment');
    } catch (error) {
      return Promise.reject('error comment');
    }
  },
};
