import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { LateralBar } from "../components/LateralBar";
import { LeanderBoardCellPhone } from "../components/leaderboardCellphone";
import { LeanderBoardTable } from "../components/leaderboardTable";
import { connectToDatabase } from "../databases";
import styles from '../styles/page/Leaderboard.module.css'

interface users {
  level: number;
  image: string;
  name: string;
  challengesCompleted: number;
  currentExperience: number;
}

interface HomeProps {
  users: users[];
}

export default function Leaderboard(props:HomeProps) {

  const [isCellphone, setIsCellphone] = useState(false);

  useEffect(() => {
    const resizeListener = () => {
      if(window.innerWidth < 600){
        setIsCellphone(true);
      } else {
        setIsCellphone(false);
      }
      
    };

    resizeListener()

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      exit={{opacity:0}}
    >
      <LateralBar/>
      <h1>Leaderboard</h1>
      {isCellphone
        ? (
          <LeanderBoardCellPhone users={props.users}/>
        ) :(
          <LeanderBoardTable users={props.users}/>
        )
      }
      
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {

  const session = await getSession({req});

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const db = await connectToDatabase(process.env.URL_CONECCT)
  const collections = db.collection("usersData");
  const users = await collections.find({}).sort({ level: -1, currentExperience: -1  }).project({ _id: 0 }).toArray()

  return {
    props: {
      users
    }
  }

}