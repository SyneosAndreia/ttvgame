import React, { useEffect, useState, useRef } from "react";
import {useTimer} from "../../context/TimerContext";

import icon1 from "../../assets/clock.png";
import icon2 from "../../assets/button.png";
import { formatTime } from "../../utils/utils";

const Timer = ({ onStartTimerShow }) => {
  const [time, setTime] = useState(0);
  const [canStop, setCanStop] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [overallTime, setOverallTime] = useState(8 * 60 * 1000);
  const {setFinalTime} = useTimer();
  const {setProcessingTime} = useTimer();

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      if (isRunning) {
        const elapsedTime = Date.now() - startTime;
        const newTime = Math.floor(elapsedTime);
        setTime(elapsedTime);

        // Update overall time
        const newOverallTime = Math.max(8 * 60 * 1000 +
           elapsedTime, 0);
        setOverallTime(newOverallTime);

        if (newTime >= 5000 && !canStop) {
          setCanStop(true);
        }

        if (newTime >= 5000 && !canStop) {
          setCanStop(true);
        }
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Enter" && canStop && isRunning) {
        console.log(overallTime)
        stopTimer(time, overallTime);
        changeScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canStop, isRunning, time]);

  const stopTimer = (finalTimeValue, finalOverallTime) => {
    setIsRunning(false);
    setFinalTime(finalTimeValue);
    setProcessingTime(finalOverallTime);
  };

  const changeScreen = () => {
    onStartTimerShow(overallTime)
  }

  return (
    <div className="screen">
        <div className="main-body grid">
          <div className="overall-time">OVERALL PROCESS TIME {formatTime(overallTime)}</div>
          <div className="clock-icon">
            <img src={icon1} alt="clock" />
          </div>
          <h2 className="post-processing-time">
            YOUR POST-PROCESSING TIME:
            <br />
            {formatTime(Math.min(time))}
          </h2>
          <div className="button-icon">
            <img src={icon2} alt="clock" />
          </div>
          <h2 className="finalise-button-text">› PRESS BUTTON TO FINALISE SCORE</h2>
        </div>
    </div>
  );
};

export default Timer;
