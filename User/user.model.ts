export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  updateAt?: Date;
  createdAt?: Date;
};
