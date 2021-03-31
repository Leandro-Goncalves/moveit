import { NowRequest, NowResponse } from '@vercel/node'
import { connectToDatabase } from '../../databases';

export default async (req: NowRequest, res: NowResponse) => {
  try{
    const db = await connectToDatabase(process.env.URL_CONECCT)
    const collections = db.collection("usersData");
    const users = await collections.find().project({ _id: 0 }).sort({ level: -1}).toArray()
    res.send({users})
  } catch(err) {
    res.send({success:false})
  }
}