import { NowRequest, NowResponse } from '@vercel/node'
import { connectToDatabase } from '../../databases';

interface levelUp {
  email: string;
  time: number
}

export default async (req: NowRequest, res: NowResponse) => {
  const { email, time } = req.body as levelUp;
  try{
    const db = await connectToDatabase(process.env.URL_CONECCT)
    const collections = db.collection("usersData");
    await collections.findOneAndUpdate({email}, {$set:{timeOut:time}});
    res.send({success:true})
  } catch {
    res.send({success:false})
  }
}