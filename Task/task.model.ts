export interface Task {
  _id: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updateAt: Date;
};
