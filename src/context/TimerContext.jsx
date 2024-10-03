import React, {createContext, useContext, useState} from 'react';

const TimmerContext = createContext();

export const TimerProvider = ({children}) => {
    const [finalTime, setFinalTime] = useState(null);
    const [processingTime, setProcessingTime] = useState(null);

    return (
        <TimmerContext.Provider value={{finalTime, setFinalTime, processingTime, setProcessingTime}}>
            {children}
        </TimmerContext.Provider>
    )
}

export const useTimer = () => useContext(TimmerContext);