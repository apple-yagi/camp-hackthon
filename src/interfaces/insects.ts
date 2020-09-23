export interface Insect {
  id: number;
  name: string;
  image: string | File;
  category: string;
  latitude: number;
  longitude: number;
}

export interface CreateInsect {
  title: string;
  image: string | ArrayBuffer;
  latitude: number;
  longitude: number;
}
