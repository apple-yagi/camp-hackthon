import { Insect, CreateInsect } from '@/interfaces/insects';
import axios, { AxiosResponse } from 'axios';
import firebase from '@/plugins/firebase';
const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000/';
const storageRef = firebase.storage().ref();

export default {
  async fetchAll(): Promise<Insect[]> {
    try {
      const res: AxiosResponse<Insect[]> = await axios.get(`${BaseUrl}insects`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error.message);
    }
  },

  async create(post: CreateInsect): Promise<string> {
    try {
      const res = await axios.post(`${BaseUrl}insects`, post);
      return Promise.resolve('success');
    } catch (error) {
      return Promise.reject('投稿に失敗しました');
    }
  },

  async remove(insectId: number): Promise<Insect> {
    try {
      const res: AxiosResponse<Insect> = await axios.delete(
        `${BaseUrl}insects/${insectId}`
      );
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject('削除に失敗しました');
    }
  },

  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const mountainsRef = storageRef.child(`insects/${file.name}`);
      mountainsRef
        .put(file)
        .then((snapshot) => {
          snapshot.ref
            .getDownloadURL()
            .then((downloadURL: string) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error.message);
            });
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },

  async findHour(hour: string): Promise<Insect[]> {
    try {
      const res: AxiosResponse<Insect[]> = await axios.get(
        `${BaseUrl}insects?sort=${hour}`
      );
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject('データの取得に失敗しました');
    }
  },
};
