import { NowRequest, NowResponse } from '@vercel/node'
import { connectToDatabase } from '../../databases';

export default async (req: NowRequest, res: NowResponse) => {
  const { email, challengesCompleted } = req.body;
  try{
    const db = await connectToDatabase(process.env.URL_CONECCT)
    const collections = db.collection("usersData");
    await collections.findOneAndUpdate({email}, {$set:{challengesCompleted}});
    res.send({success:true})
  } catch {
    res.send({success:false})
  }
}