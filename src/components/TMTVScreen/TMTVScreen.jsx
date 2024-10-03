import React, { useState, useEffect } from "react";
import { StartScreen } from "../screens/StartScreen";
import "./TMTVScreen.css";
import { InstructionsScreens } from "../screens/InstructionsScreens";
import { LoadingScreen } from "../screens/LoadingScreen";
import Footer from "../Footer/Footer";
import { StartTimer } from "../screens/StartTimer";
import Timer from "../screens/Timer";
import { FinalScreen } from "../screens/FinalScreen";
import { useTimer } from "../../context/TimerContext";

export const TMTVScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("start");
  const [loading, setLoading] = useState(false);
  const [instructionIndex, setInstructionIndex] = useState(0);

  const [currentUser, setCurrentUser] = useState({ id: '001', name: '001', score: null });
  const [topPlayers, setTopPlayers] = useState([]);

  const [gameEndTime, setGameEndTime] = useState(null);
  const { processingTime } = useTimer();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
      // If no users exist, start with user 001
      const newUser = { id: '001', name: '001', score: null };
      localStorage.setItem('users', JSON.stringify([newUser]));
      setCurrentUser(newUser);
    } else {
      // Find the first user without a score, or create a new one
      const userWithoutScore = users.find(user => user.score === null);
      if (userWithoutScore) {
        setCurrentUser(userWithoutScore);
      } else {
        const lastUser = users[users.length - 1];
        const nextNumber = String(parseInt(lastUser.id, 10) + 1).padStart(3, '0');
        const newUser = { id: nextNumber, name: nextNumber, score: null };
        setCurrentUser(newUser);
      }
    }
  }, []);

  const updateLeaderboard = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users)
    let sortedUsers = users
      .filter(user => user.score !== null)
      .sort((a, b) => a.score - b.score);

    if (sortedUsers.length === 0) {
      console.log('sorted')
      // sortedUsers = [{ id: '001', name: '001', score: processingTime }];
      // setTopPlayers(sortedUsers);
      console.log(users.find(user => user.id === '001'))

    const user001 = users.find(user => user.id === '001');
    user001.score = processingTime;
    sortedUsers = [user001];

    
    } else if (sortedUsers.length === 1) {
      setTopPlayers(sortedUsers);
    } else if (sortedUsers.length === 2) {
      setTopPlayers(sortedUsers);
    } else {
      setTopPlayers(sortedUsers.slice(0, 3));
    }
  };


  const assignScoreAndCreateNextUser = (endTime) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let updatedUsers = users.map(user => 
      user.id === currentUser.id ? { ...user, score: endTime } : user
    );

    console.log(users)

    // If the current user is not in the list, add them
    if (!updatedUsers.some(user => user.id === currentUser.id)) {
      updatedUsers.push({ ...currentUser, score: endTime });
    }

    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Find the next user without a score or create a new one
    const nextUserWithoutScore = updatedUsers.find(user => user.score === null);
    if (nextUserWithoutScore) {
      setCurrentUser(nextUserWithoutScore);
    } else {
      const lastUser = updatedUsers[updatedUsers.length - 1];
      const nextNumber = String(parseInt(lastUser.id, 10) + 1).padStart(3, '0');
      setCurrentUser({ id: nextNumber, name: nextNumber, score: null });
    }
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      const code = e.code;
      if (code === "Enter" && currentScreen === "start") {

      // assignScoreAndCreateNextUser();
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

  useEffect(() => {
    setInstructionIndex(0);
    setLoading(false);
  }, [currentScreen]);

  const handleStartTimerShow = () => {
    setCurrentScreen('startTimer');
  };

  const handleLoadingScreenShow = () => {
    setCurrentScreen('loading');
  };

  const handleLastScreenShow = () => {
    const endTime = processingTime;
    console.log(endTime)
    setGameEndTime(endTime);
    assignScoreAndCreateNextUser(endTime);
    updateLeaderboard(endTime);
    setCurrentScreen('finalScreen');
  };

  const handleRestartScreen = () => {
    setCurrentScreen('start');
  };


  console.log(gameEndTime)

  return (
    <>
      <div className="screens">
        {currentScreen === "start" && <StartScreen userName={currentUser.name} />}
        {currentScreen === "instructions" && <InstructionsScreens onInstructionsComplete={handleLoadingScreenShow} />}
        {currentScreen === "loading" && <LoadingScreen loading={loading} onStartTimerShow={handleStartTimerShow} />}
        {currentScreen === "startTimer" && <StartTimer />}
        {currentScreen === "timer" && <Timer onStartTimerShow={handleLastScreenShow} />}
        {currentScreen === "finalScreen" && <FinalScreen onStartTimerShow={handleRestartScreen} topPlayers={topPlayers} gameEndTime={gameEndTime} />}
      </div>
      {currentScreen === "start" && <Footer />}
    </>
  );
};