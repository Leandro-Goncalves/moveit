import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

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

export function Countdown() {

  const { 
    minutes,
    seconds,
    hasFinish,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

  return(
    <motion.div>
      <motion.div variants={fadeUp} className={styles.countdownContaner}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </motion.div>

      { hasFinish ? (
        <button
          disabled
          className={styles.CountdownButton}
        >
          Ciclo encerrado
          <span><img src="icons/check-cicle.svg" alt="check-cicle"/></span>
        </button>
      ) : (
        <>
        {isActive ? (
          <motion.button
            variants={fadeUp}
            whileTap={{ scale: 0.9 }}
            type="button"
            className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}
            onClick={resetCountdown}
          >
            Abandonar ciclo
          </motion.button>
          ) : (
            <motion.button
              variants={fadeUp}
              whileTap={{ scale: 0.9 }}
              type="button"
              className={styles.CountdownButton}
              onClick={startCountdown}
            >
              Iníciar um ciclo
            </motion.button>
          )

        }
        </>
      )}      
    </motion.div>
  )
}