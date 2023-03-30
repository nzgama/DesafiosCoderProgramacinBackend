import { MongoClient, Database } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";


const client: MongoClient = new MongoClient();
const database: Database = client.database(`${Deno.env.get('MONGO_DATABASE_NAME')}`)
client.connectWithUri(`${Deno.env.get('MONGO_URI')}`);


async function find<type>(collection: string, filter?: any) {
  const result: any[] = await database.collection(collection)
    .find(filter);

  return result.map((value: any) => {
    value._id = value._id.$oid;
    return value as type;
  });
}

async function findOne<type>(collection: string, filter?: any) {
  const result = await database.collection(collection)
    .findOne(filter);
  
  result._id = result._id.$oid;
  return result;
}

async function insertOne<type>(collection: string, document: type) {
  const { $oid } = await database.collection(collection)
    .insertOne(document);
  
  return findOne<type>(collection, {_id: {$oid: $oid}});
}

async function updateOne<type>(collection: string, id: string, document: type) {
  const result = await database.collection(collection)
    .updateOne(
      { _id: { "$oid": id }},
      { $set: document },
    );
  console.log(result);
    
  return findOne<type>(collection, { _id: { $oid: id }});
}

export default {
  find,
  findOne,
  insertOne,
  updateOne
};
