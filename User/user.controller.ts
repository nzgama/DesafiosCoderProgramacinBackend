import repository from "./user.repository.ts";
import { User } from "./user.model.ts";


function getAllUser() {
  return repository.getAllUser();
}

function getUser(userId: string) {
  return repository.getUser(userId);
}

function addUser(user: User) {
  user.createdAt = new Date();
  user.updateAt = user.createdAt;
  return repository.addUser(user);
}

export default { getAllUser, getUser, addUser };
