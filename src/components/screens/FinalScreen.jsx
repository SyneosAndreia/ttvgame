import React, {useEffect} from 'react';
import { useTimer } from '../../context/TimerContext';
import { formatTime } from '../../utils/utils';

import rankBorder from '../../assets/rank.png';
import finalImage from '../../assets/final-image.png';

import logo from '../../assets/logo.png'
import reset from '../../assets/reset.png'



export const FinalScreen = ({ onStartTimerShow }) => {
    const { finalTime, processingTime } = useTimer();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Enter") {
        changeScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const changeScreen = () => {
    onStartTimerShow()
  }

   return (
    <>
    <div className="screen final-screen">
        <h1 className='mb-50'><span className='font-regular'>CONGRATS PLAYER 3!</span><br/>
        YOU HAVE THE HIGHEST SCORE</h1>
        <div className='col-wrap'>
            <div className='col-l vertical-line'>
                <div className='rank-comp'>
                    <img src={rankBorder} alt="" />
                    <h1 className='text-m'>RANK</h1>
                </div>
                <div className='rank-players mt-50'>
                    <p className='text-m color-main font-bold'><span className='pr-70'>PLAYER 001</span>01:02:22</p>
                    <p className='text-m'><span className='pr-90'>PLAYER 002</span>01:02:22</p>
                    <p className='text-m'><span className='pr-90'>PLAYER 003</span>01:02:22</p>
                </div>
            </div>
            <div className='col-r'>
                <div className='border-purple final-image'>
                    <img src={finalImage} alt="" />
                </div>
                <div className='table-result'>
                    <div className='table-top'>
                        <p className='font-bold color-main'>Your post-processing result</p>
                        <p className='font-bold color-main'>{formatTime(processingTime)}</p>
                    </div>
                    <div className='table-bot'>
                        <p>Overall process time</p>
                        <p>{formatTime(finalTime)}</p>
                    </div>
                </div>
                <div className='reset-btn mt-50'>
                    <img src={reset} alt="alt reset"/>
                    <span>RESET</span>
                </div>
                <div className='final-logo mt-50'>
                    <img src={logo} alt="logo" />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
