export interface Post {
  id: number;
  title: string;
  image: string | File;
  category: string;
  latitude: number;
  longitude: number;
}

export interface CreatePost {
  title: string;
  image: string | ArrayBuffer;
  latitude: number;
  longitude: number;
}
