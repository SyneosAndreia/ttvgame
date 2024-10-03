import React, { useState, useEffect, useRef } from "react";
import { StartScreen } from "../screens/StartScreen";
import icon3 from "../../assets/button.png";

import screenData from "../../data/screens.json";

import "./TMTVScreen.css";
import { InstructionsScreens } from "../screens/InstructionsScreens";
import { LoadingScreen } from "../screens/LoadingScreen";
import Footer from "../Footer/Footer";
import { StartTimer } from "../screens/StartTimer";
import Timer from "../screens/Timer";
import { FinalScreen } from "../screens/FinalScreen";

export const TMTVScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [loading, setLoading] = useState(false);
  const [instructionIndex, setInstructionIndex] = useState(0);
  const [userNumber, setUserNumber] = useState('001');


  const assignNumber = () => {
    const lastNumber = localStorage.getItem('lastAssignNumber') || '001';
    const nextNumber = String(parseInt(lastNumber, 10) + 1).padStart(3, '0');

    if (nextNumber > '999') {
      console.log('all numbers have been assign')
      return;
    }

    localStorage.setItem('lastAssignNumber', nextNumber);
    localStorage.setItem('userNumber', nextNumber);
    setUserNumber(nextNumber)

  }

  useEffect(() => {
    const savedNumber = localStorage.getItem('userNumber');
    if(savedNumber) {
      setUserNumber(savedNumber)
    }
  }, [])


  useEffect(() => {
    const handleKeyDown = (e) => {
      const code = e.code;
      if (code === "Enter" && currentScreen === "start") {
        setCurrentScreen("instructions");
      }
      if (code === "Enter" && currentScreen === "startTimer") {
        setCurrentScreen("timer");
      }
    };

    if (currentScreen === "start" || currentScreen === "startTimer") {

      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentScreen, instructionIndex]);


  // New effect to handle page changes
  useEffect(() => {
    setInstructionIndex(0);
    setLoading(false);
  }, [currentScreen]);


  const handleStartTimerShow = () => {
    setCurrentScreen('startTimer')
  }

  const handleLoadingScreenShow = () => {
    setCurrentScreen('loading')
  }

  const handleLastScreenShow = () => {
    setCurrentScreen('finalScreen')
  }
  const handleRestartScreen = () => {
    setCurrentScreen('start')
    assignNumber()
    console.log(userNumber)
  }

  return (
    <>
      <div className="screens">
        {currentScreen === "start" && <StartScreen userName={userNumber} /> }
        {currentScreen === "instructions" && <InstructionsScreens onInstructionsComplete={handleLoadingScreenShow} /> }
        {currentScreen === "loading" && <LoadingScreen loading={loading} onStartTimerShow={handleStartTimerShow} /> }
        {currentScreen === "startTimer" && <StartTimer />}
        {currentScreen === "timer" && <Timer onStartTimerShow={handleLastScreenShow} />}
        {currentScreen === "finalScreen" && <FinalScreen onStartTimerShow={handleRestartScreen} />}
      </div>
      {currentScreen === "start" && <Footer />}
     
    </>
  );
};
