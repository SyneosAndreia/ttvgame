import React, {createContext, useContext, useState} from 'react';

const TimerContext = createContext();

export const TimerProvider = ({children}) => {
    const [finalTime, setFinalTime] = useState(null);
    const [processingTime, setProcessingTime] = useState(null);

    return (
        <TimerContext.Provider value={{finalTime, setFinalTime, processingTime, setProcessingTime}}>
            {children}
        </TimerContext.Provider>
    )
}

export const useTimer = () => useContext(TimerContext);