import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile({url, name}) {

  const { level } = useContext(ChallengesContext)

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
    <motion.div
      className={styles.profileContainer}
      variants={fadeUp}
    >
      <img src={url} alt={name} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt=""/>
          Level {level}
        </p>
      </div>
    </motion.div>
  )
}