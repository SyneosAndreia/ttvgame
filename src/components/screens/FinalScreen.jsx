import React, {useEffect, useState, useRef, useLayoutEffect } from 'react';
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import { useTimer } from '../../context/TimerContext';
import { formatTime } from '../../utils/utils';

import rankBorder from '../../assets/rank.png';
import finalImage from '../../assets/final-image.png';
import reset from '../../assets/reset.png'


gsap.registerPlugin(CSSPlugin);


export const FinalScreen = ({ onStartTimerShow, topPlayers, gameEndTime, userName }) => {
    const { finalTime, processingTime } = useTimer();
    const [winner, setWinner] = useState(false);

    const titleRef = useRef(null)
    const buttonRef = useRef(null)

    const checkFirstPlayerName = (array, _name) => {
        const topPlayer = array[0]

        if(topPlayer.name === _name) {
            setWinner(!winner)
        }
    }

  useEffect(() => {
    checkFirstPlayerName(topPlayers, userName)

    const handleKeyDown = (e) => {
      if (e.code === "Enter") {
        changeScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  //Animate copy
  useLayoutEffect(() => {
    const elements = [
      titleRef.current,
      buttonRef.current
    ];

      const tl = gsap.timeline();

      if(titleRef.current) {
        tl.fromTo(titleRef.current, {
            opacity: 0,
            y: -30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.2
          }
        );

      }

      const tlbtn = gsap.timeline();
      // Add a subtle bounce to the button
      tlbtn.to(buttonRef.current, {
        y: -5,
        repeat: -.5,
        yoyo: true,
        duration: 0.5,
        ease: "power1.inOut"
      });

      return () => {
        tl.kill();
      };
  }, []);

  const changeScreen = () => {
    onStartTimerShow()
  }

   return (
    <>
    <div className="screen final-screen">
        {winner && 
            <h2 ref={titleRef} className='text-l'><span className='font-regular text-80'>CONGRATS PLAYER {userName}!</span><br/>
         <span className='font-bold'>YOU HAVE THE HIGHEST SCORE</span></h2>
         }   
        <div className='col-wrap'>
            <div className='col-l '>
                <div className='rank-comp'>
                    <img src={rankBorder} alt="" />
                    <h1 className='text-m'>RANK</h1>
                </div>
                <div className='rank-players mt-50'>
                    {topPlayers && topPlayers.map((player, index) => {
                        return (
                            <p key={player.id} className={`text-m ${index === 0 ? 'color-main font-bold pr-70' : ''}`}><span className={`${index === 0 ? 'pr-70' : 'pr-90'}`}>PLAYER {player.name}</span>{formatTime(player.score)}</p>
                        ) 
                    })}
                </div>
            </div>
            <div className='vertical-line'></div>
            <div className='col-r'>
                <div className='border-purple final-image'>
                    <img src={finalImage} alt="" />
                </div>
                <div className='table-result'>
                    <div className='table-top'>
                        <p className='font-bold color-main'>Your post-processing result</p>
                        <p className='font-bold color-main'>{formatTime(gameEndTime)}</p>
                    </div>
                    <div className='table-bot'>
                        <p>Overall process time</p>
                        <p>{formatTime(finalTime)}</p>
                    </div>
                </div>
                <div ref={buttonRef} className='reset-btn mt-50'>
                    <img src={reset} alt="alt reset"/>
                    <span>RESTART</span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
