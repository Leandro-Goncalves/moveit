import { NowRequest, NowResponse } from '@vercel/node'
import { connectToDatabase } from '../../databases';

export default async (req: NowRequest, res: NowResponse) => {
  try{
    const db = await connectToDatabase(process.env.URL_CONECCT)
    const collections = db.collection("challenges");
    const challenges = await collections.find({}).toArray();

    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[ramdomChallengeIndex];

    res.send({challenge})
  } catch {
    res.send({success:false})
  }
}