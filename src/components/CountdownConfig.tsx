import { motion } from 'framer-motion';
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/CountdownConfig.module.css';

const fadeUp = {
  initial: {
    y: 60,
    opacity:0
  },
  animate: {
    y: 0,
    opacity:1
  },
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
      staggerChildren: .10
    }
  }
}

export function CountDownConfig() {

  const { minutes, setTimeOut, closeCountDownModal } = useContext(CountdownContext)
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
        <div className={styles.grid}>
          <motion.button
            className={minutes === 5 ? styles.currentTime : ''} 
            onClick={()=>{setTimeOut(60*5)}}
            variants={fadeUp}
            whileTap={{
              scale: 0.8
            }}
          >
            5
          </motion.button>
          <motion.button
            className={minutes === 10 ? styles.currentTime : ''}
            onClick={()=>{setTimeOut(60*10)}}
            variants={fadeUp}
            whileTap={{
              scale: 0.8
            }}
          >
            10
          </motion.button>
          <motion.button
            className={minutes === 15 ? styles.currentTime : ''}
            onClick={()=>{setTimeOut(60*15)}}
            variants={fadeUp}
            whileTap={{
              scale: 0.8
            }}
          >
            15
          </motion.button>
          <motion.button
            className={minutes === 20 ? styles.currentTime : ''}
            onClick={()=>{setTimeOut(60*20)}}
            variants={fadeUp}
            whileTap={{
              scale: 0.8
            }}
          >
            20
          </motion.button>
          <motion.button
            className={minutes === 25 ? styles.currentTime : ''}
            onClick={()=>{setTimeOut(60*25)}}
            variants={fadeUp}
            whileTap={{
              scale: 0.8
            }}
          >
            25
          </motion.button>
          <motion.button
            className={minutes === 30 ? styles.currentTime : ''}
            onClick={()=>{setTimeOut(60*30)}}
            variants={fadeUp}
            whileTap={{
              scale: 0.8
            }}
          >
            30
          </motion.button>
        </div>
        <motion.button
          className={minutes === 60 ? `${styles.currentTime} ${styles.hours}` : `${styles.hours}`}
          onClick={()=>{setTimeOut(60*60)}}
          variants={fadeUp}
          whileTap={{
            scale: 0.8
          }}
        >
          1
        </motion.button>
      </motion.div>
    </motion.div>
  )
}