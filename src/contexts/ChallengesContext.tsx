import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import axios from 'axios';
import { getSession } from 'next-auth/client';

interface Challenge {
  type: 'body'| 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData {
  level: number,
  challengesCompleted : number,
  currentExperience: number,
  levelUp: () => void,
  startNewChallenge: () => void,
  activeChallenge: Challenge,
  resetChallenge: () => void,
  experienceToNextLevel: number,
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(()=>{
    Notification.requestPermission();
  }, []);

  useEffect(()=>{
    async function setDataInDb(){
      const {user} = await getSession();
      axios.post('/api/levelUp', {email:user.email, level:level});
      axios.post('/api/currentExperience', {email:user.email, currentExperience:currentExperience})
      axios.post('/api/challengesCompleted', {email:user.email, challengesCompleted:challengesCompleted})
    }
    setDataInDb()
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[ramdomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1)
  }

  return(
    <ChallengesContext.Provider
      value={{
        level,
        challengesCompleted,
        currentExperience,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal/> }
    </ChallengesContext.Provider>
  )
}
