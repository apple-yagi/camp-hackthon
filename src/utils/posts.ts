import { Post } from '@/interfaces/post';
import axios, { AxiosResponse } from 'axios';
const BackendUrl = process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000/';

export default {
  async fetchAll(): Promise<Post[]> {
    try {
      const res: AxiosResponse<Post[]> = await axios.get(`${BackendUrl}posts`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error.message);
    }
  },
};
