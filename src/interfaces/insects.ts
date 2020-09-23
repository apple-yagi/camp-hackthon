export interface Insect {
  id: number;
  name: string;
  description: string;
  hour: string;
  image: string;
  category: string;
  latitude: number;
  longitude: number;
}

export interface CreateInsect {
  name: string;
  description: string;
  image: string | ArrayBuffer;
  latitude: number;
  longitude: number;
}
