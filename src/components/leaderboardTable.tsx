import { motion } from "framer-motion"
import styles from '../styles/page/Leaderboard.module.css'
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

interface LeanderBoardTableProps {
  users: users[];
}

export function LeanderBoardTable(props:LeanderBoardTableProps) {

  function calculateCurrentExperience(currentExperience: number, level: number) {

    let experience = 0;

    for(let i = 1; i <= level; i++) {
      experience += Math.pow((i + 1) * 4, 2);
    }

    experience += currentExperience;

    return experience;
  }

  return(
    <motion.table
        className={styles.table}
        animate="animate"
        initial="initial"
        variants={stagger}
      >
        <thead>
          <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Desafios</th>
            <th>Experiência</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, key) => (
            <motion.tr
              key={key}
              variants={fadeUp}
            >
              <td className={styles.space}>{key + 1}</td>
              <td>
                <div className={styles.userContent}>
                  <img src={user.image} alt={user.name} />
                  <div>
                    <h3>{user.name}</h3>
                    <img src="/icons/level.svg" alt="level"/>
                    <span>Level {user.level}</span>
                  </div>
                </div>
              </td>
              <td><span className={styles.blue}>{user.challengesCompleted}</span> 
              {user.challengesCompleted !== 1 ? " completados" : " completado"}
              </td>
              <td><span className={styles.blue}>{
                calculateCurrentExperience(user.currentExperience, user.level)
              }</span> xp</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
  )
}