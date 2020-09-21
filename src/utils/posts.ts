import { Post, CreatePost } from '@/interfaces/post';
import axios, { AxiosResponse } from 'axios';
const BackendUrl =
  process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000/posts';

export default {
  async fetchAll(): Promise<Post[]> {
    try {
      const res: AxiosResponse<Post[]> = await axios.get(`${BackendUrl}`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error.message);
    }
  },

  async create(post: CreatePost): Promise<string> {
    try {
      const res = await axios.post(BackendUrl, post);
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject('投稿に失敗しました');
    }
  },
};
