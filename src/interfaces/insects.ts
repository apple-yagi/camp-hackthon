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
  image: File;
  latitude: number;
  longitude: number;
}
