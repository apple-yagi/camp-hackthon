export interface Insect {
  id: number;
  user_id: number;
  name: string;
  description: string;
  question: boolean;
  hour: string;
  image: string;
  category: string;
  latitude: number;
  longitude: number;
}

export interface CreateInsect {
  name: string;
  user_id: number;
  question: boolean;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
}
