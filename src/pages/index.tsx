import styles from '../styles/page/Login.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { GitButton } from '../components/GitButton';
import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: {
    y: 60,
    opacity:0
  },
  animate: {
    y: 0,
    opacity:1
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: .12
    }
  }
}

export default function Login() {
  return(
    <motion.div
      className={styles.container}
      animate="animate"
      initial="initial"
      variants={stagger}
    >
      <div className={styles.itensContainer}>
        <motion.img
          src="logo-full.svg"
          alt="logo"
          variants={fadeUp}
        />

        <motion.h1
          variants={fadeUp}
        >Bem-vindo</motion.h1>
        <motion.div
          className={styles.loginText}
          variants={fadeUp}
        >
          <img src="/icons/git-logo.svg" alt="git logo"/>
          <div>
            <h2>Faça login com seu Github</h2>
            <h2>para começar</h2>
          </div>
        </motion.div>
        <GitButton/>
      </div>
    </motion.div>
  )
}

export const getServerSideProps:GetServerSideProps = async ({ req }) => {
  const session = await getSession({req})

  if(session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}