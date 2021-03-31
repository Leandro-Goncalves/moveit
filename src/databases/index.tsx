import { MongoClient, Db } from "mongodb";

let cachedDb: Db = null;

export async function connectToDatabase(uri: string) {

  if(cachedDb){
    return  cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("moveit")

  cachedDb = db;

  return db;
}