import { Post, CreatePost } from '@/interfaces/post';
import axios, { AxiosResponse } from 'axios';
const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/';

export default {
  async fetchAll(): Promise<Post[]> {
    try {
      const res: AxiosResponse<Post[]> = await axios.get(`${BaseUrl}insects`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error.message);
    }
  },

  async create(post: CreatePost): Promise<string> {
    try {
      const res = await axios.post(`${BaseUrl}insects`, post);
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject('投稿に失敗しました');
    }
  },
};
