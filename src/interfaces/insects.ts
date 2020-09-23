export interface Insect {
  id: number;
  name: string;
  image: string;
  category: string;
  latitude: number;
  longitude: number;
}

export interface CreateInsect {
  name: string;
  image: string | ArrayBuffer | null;
  latitude: number;
  longitude: number;
}
