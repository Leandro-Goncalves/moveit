import { NowRequest, NowResponse } from '@vercel/node'
import { connectToDatabase } from '../../databases';

export default async (req: NowRequest, res: NowResponse) => {
  const { email } = req.body;

  const db = await connectToDatabase(process.env.URL_CONECCT)
  const collections = db.collection("usersData");
  const userData = await collections.findOne({email});
  res.send(userData)
}