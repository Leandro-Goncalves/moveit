import axios from 'axios';
import { getSession } from 'next-auth/client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { CountDownConfig } from '../components/CountdownConfig';
import { ChallengesContext } from './ChallengesContext';

interface CountdownProviderProps {
  children: ReactNode;
  timeOut: number
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinish: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
  isCoundownConfigModalOpen: boolean;
  setTimeOut: (timeOut:number) => Promise<void>;
  openCountDownModal:() => void;
  closeCountDownModal:() => void;
}

export const CountdownContext = createContext({} as CountdownContextData )

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ timeOut, children }: CountdownProviderProps) {

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(timeOut ?? 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinished] = useState(false);

  const [isCoundownConfigModalOpen, setIsCoundownConfigModalOpen] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  async function setTimeOut(timeout:number) {
    setTime(timeout);
    setIsCoundownConfigModalOpen(false)
    const {user} = await getSession();
    axios.post('/api/timeout',{email:user.email, time:timeout})
  }
  
  function openCountDownModal(){
    setIsCoundownConfigModalOpen(true)
  }

  function closeCountDownModal(){
    setIsCoundownConfigModalOpen(false)
  }

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(timeOut ?? 60);
    setHasFinished(false);
  }

  useEffect(()=>{
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=>{setTime(time - 1)},1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinish,
      isActive,
      startCountdown,
      resetCountdown,
      isCoundownConfigModalOpen,
      setTimeOut,
      openCountDownModal,
      closeCountDownModal
    }}>
      {children}
      { isCoundownConfigModalOpen && <CountDownConfig/>}
    </CountdownContext.Provider>
  )
}