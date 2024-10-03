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


  // INSTRUCTIONS TIMER
  useEffect(() => {
    // let timer;
    // if (
    //   currentScreen === "instructions" &&
    //   instructionIndex < screenData.instructions.length - 1
    // ) {
    //   timer = setTimeout(() => {
    //     setInstructionIndex((prev) => prev + 1);
    //   }, 10000);
    // } else if (
    //   currentScreen === "instructions" &&
    //   instructionIndex === screenData.instructions.length - 1
    // ) {
    //   timer = setTimeout(() => {
    //     setCurrentScreen("loading");
    //     setLoading(true);
    //   }, 7000);
    // }

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
  }

  return (
    <>
      <div className="screens">
        {currentScreen === "start" && <StartScreen /> }
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
