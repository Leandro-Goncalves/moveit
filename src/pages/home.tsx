import Head from 'next/head'
import {GetServerSideProps} from 'next';

import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/CountDown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountdownProvider } from '../contexts/CountdownContext'
import styles from '../styles/page/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCsrfToken, getProviders, getSession } from 'next-auth/client';
import axios from 'axios';
import { connectToDatabase } from '../databases';
import { LateralBar } from '../components/LateralBar';
import { motion } from 'framer-motion';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  image: string;
  name: string;
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: .12
    }
  }
}

export default function Home(props: HomeProps) {
  
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <motion.div 
        className={styles.container}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{opacity:0}}
      >
        <Head>
          <title>Início | move.it</title>
        </Head>
        
        <ExperienceBar />
        <LateralBar/>
        <CountdownProvider>
          <section>
            <motion.div variants={stagger} initial="initial" animate="animate">
              <Profile url={props.image} name={props.name}/>
              <CompletedChallenges/>
              <Countdown/>
            </motion.div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </motion.div>
    </ChallengesProvider>
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

  const email = session.user.email;
  const db = await connectToDatabase(process.env.URL_CONECCT)
  const collections = db.collection("usersData");
  const data = await collections.findOne({email});

  return {
    props: {
      level: Number(data.level),
      currentExperience: Number(data.currentExperience),
      challengesCompleted: Number(data.challengesCompleted),
      image: data.image,
      name: data.name
    } as HomeProps
  }

}