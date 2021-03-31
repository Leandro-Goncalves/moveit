import { motion } from "framer-motion"
import styles from '../styles/components/LeaderboardCellphone.module.css'
const stagger = {
  animate: {
    transition: {
      staggerChildren: .12
    }
  }
}

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


interface users {
  level: number;
  image: string;
  name: string;
  challengesCompleted: number;
  currentExperience: number;
}

interface LeanderBoardCellPhoneProps {
  users: users[];
}

export function LeanderBoardCellPhone(props:LeanderBoardCellPhoneProps) {

  return(
    <motion.div
      className={styles.container}
      animate="animate"
      initial="initial"
      variants={stagger}
    >
      {props.users.map((user, key) => (
        <motion.div
          key={key}
          className={styles.user}
          variants={fadeUp}
        >
          <div className={styles.position}>
            {key + 1}
          </div>
          <img src={user.image} alt={user.name}/>
          <div className={styles.userInformation}>
            <h1>{user.name}</h1>
            <img src="/icons/level.svg" alt="level"/>
            <span>Level {user.level}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}