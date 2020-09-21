export interface Post {
  id: number;
  title: string;
  image: string | File;
  category: string;
  lat: number;
  lng: number;
}
