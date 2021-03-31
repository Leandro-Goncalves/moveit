import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from '../styles/components/GitButton.module.css'
import { motion } from 'framer-motion'
export function GitButton() {

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

  return(
    <motion.button
      onClick={()=>signIn("github")} className={styles.gitButton}
      whileTap={{ scale: 0.9 }}
      variants={fadeUp}
    >
      Login github
    </motion.button>
  )
}