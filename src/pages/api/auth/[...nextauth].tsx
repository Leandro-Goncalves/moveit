import { MongoClient, Db } from 'mongodb';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import { session } from 'next-auth/client';
import Providers from 'next-auth/providers'
import { connectToDatabase } from '../../../databases'; 

export default (req, res) => 
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRETS,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      async session(session, token) {
        const db = await connectToDatabase(process.env.URL_CONECCT)
        const collections = db.collection("usersData");
        const userData = await collections.findOne({email: session.user.email});
        if(!userData){
          await collections.insertOne({
            email: session.user.email, 
            challengesCompleted: 0,
            currentExperience: 0,
            level:1,
            name: session.user.name,
            image: session.user.image
          });
        }
        return {
          ...session,
        }
      },
    }
  })