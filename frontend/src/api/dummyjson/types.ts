export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;

};

export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};