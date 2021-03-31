import { NowRequest, NowResponse } from '@vercel/node'
import { connectToDatabase } from '../../databases';

interface levelUp {
  email: string;
  level: number
}

export default async (req: NowRequest, res: NowResponse) => {
  const { email, level } = req.body as levelUp;
  try{
    const db = await connectToDatabase(process.env.URL_CONECCT)
    const collections = db.collection("usersData");
    await collections.findOneAndUpdate({email}, {$set:{level}});
    res.send({success:true})
  } catch {
    res.send({success:false})
  }
}