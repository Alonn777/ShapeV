import { createContext, useState } from "react";

export const TimerContext = createContext();

export const TimerContextProvider = ({ children }) => {
  const [TimerValueContext , SetTimerValueContext] = useState(0);
  const [paused, SetPause] = useState(false)
  const [finishedTimer, SetFinnished] = useState(false)
  return (
    <TimerContext.Provider value={{TimerValueContext, SetTimerValueContext, paused, SetPause, finishedTimer, SetFinnished }}>
      {children}
    </TimerContext.Provider>
  );
};
