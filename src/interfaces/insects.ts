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
  image: Blob;
  latitude: number;
  longitude: number;
}
