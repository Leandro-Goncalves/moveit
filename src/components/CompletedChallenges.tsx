import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

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

export function CompletedChallenges() {

  const { challengesCompleted } = useContext(ChallengesContext)

  return(
    <motion.div
      variants={fadeUp}
      className={styles.completedChallengesContainer}
    >
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </motion.div>
  )
}