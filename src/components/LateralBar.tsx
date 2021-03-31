import styles from '../styles/components/LateralBar.module.css'
import { ActiveLink } from './ActiveLink'
import { BsHouseDoor } from 'react-icons/bs';
import { RiMedalLine } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';
import { signOut } from 'next-auth/client';


export function LateralBar() {
  return(
    <div className={styles.container}>
      <img src="/logo-lateralBar.svg" alt="logo"/>
      <nav className={styles.items}>
        <ActiveLink activeClassName={styles.active} href="/home" defaultClassName={styles.item}>
          <a><BsHouseDoor size="2em"/></a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/leaderboard" defaultClassName={styles.item}>
          <a><RiMedalLine size="2em"/></a>
        </ActiveLink>
      </nav>
      <button
        className={styles.exit}
        onClick={()=>{
          signOut()
        }}
      >
        <ImExit size="2em"/>
      </button>
    </div>
  )
}