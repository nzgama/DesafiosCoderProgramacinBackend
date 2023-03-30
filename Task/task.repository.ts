import { Task } from "./task.model.ts";
import mongo from "./../Core/repository/mongo.module.ts";


function getAllTasks() {
 return mongo.find('task');
}

function getTask(id: string) {
  return mongo.findOne('task', {_id: {$oid: id}});
}

function getAllUserTasks(userId: string) {
  return mongo.find('task', { userId })
}

function addTask(task: Task): Promise<Task> {
  return mongo.insertOne('task',task);
}

export default { getAllTasks, getTask, getAllUserTasks ,addTask };
