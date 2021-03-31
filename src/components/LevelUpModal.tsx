import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

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

const fade = {
  initial: {
    y: -60,
    opacity:0
  },
  animate: {
    y: 0,
    opacity:1
  }
}

const container = {
  initial:{ 
    opacity:0,
    scale: 0.8
  },
  animate:{ 
    opacity:1,
    scale: 1,
    transition: {
      staggerChildren: .12
    }
  }
}

export function LevelUpModal() {

  const { level, closeLevelUpModal } = useContext(ChallengesContext)

  return(
    <motion.div
      className={styles.overlay}
      animate="animate"
      initial="initial"
    >
      <motion.div
        className={styles.container}
        variants={container}
      >
        <motion.header
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        ><motion.span
          variants={fade}
          transition={{ duration: 1.5 }}
        >{level}</motion.span></motion.header>

        <motion.strong
          variants={fadeUp}
        >Parabéns</motion.strong>
        <motion.p
          variants={fadeUp}
        >Vocé alcançou um novo level.</motion.p>

        <motion.button
          type="button"
          onClick={closeLevelUpModal}
          whileTap={{ scale: 0.8 }}
        >
          <img src="/icons/close.svg" alt="Fechar Modal"/>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}