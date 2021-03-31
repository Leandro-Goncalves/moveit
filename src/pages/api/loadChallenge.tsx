import { NowRequest, NowResponse } from '@vercel/node'
import { connectToDatabase } from '../../databases';

export default async (req: NowRequest, res: NowResponse) => {
  try{
    const db = await connectToDatabase(process.env.URL_CONECCT)
    const collections = db.collection("challenges");
    const challenges = await collections.find({}).toArray();
    //Math.floor(Math.random() * 100)
    res.send({challenges})
  } catch {
    res.send({success:false})
  }
}