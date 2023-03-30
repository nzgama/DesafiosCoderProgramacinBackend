import { Report } from "./report.model.ts";
import mongo from "./../Core/repository/mongo.module.ts";

 
function getReport(id: string) {
  return mongo.findOne('user', {_id: {$oid: id}});
}


export default { getReport };