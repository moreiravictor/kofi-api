export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  phone: string | null;
  uf: string | null;
  city: string | null;
  photo: string | null;
}