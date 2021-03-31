import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContext';

interface CountdownProviderProps {
  children: ReactNode;
}

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinish: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData )

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(60 * 1);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(60 * 1);
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
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}