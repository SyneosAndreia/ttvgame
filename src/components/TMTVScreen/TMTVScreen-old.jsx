import React, {useState, useEffect, useRef} from 'react';
import { gsap } from 'gsap/gsap-core';
import { CSSPlugin } from 'gsap/CSSPlugin';


import header from '../../assets/MainTitle.png';
import icon1 from '../../assets/clock.png';
import icon2 from '../../assets/loadingbar.png'
import icon3 from '../../assets/button.png'
import icon4 from '../../assets/podium.png'

import './TMTVScreen.css';

gsap.registerPlugin(CSSPlugin);
export const TMTVScreen = () => {
    const [currentScreen, setCurrentScreen] = useState('start');
    const [instructionIndex, setInstructionIndex] = useState(0);
    const [loading, setLoading] = useState(false);


    const titleRef = useRef(null)
  
    const instructions = [
      "HOW DOES IT WORK?",
      "1 › WAIT FOR THE SCAN",
      "2 › Prepare for the post-processing",
      [
        "3 ›",
        "4 ›" 
      ],
      "5 › View your results"
    ];
  
    useEffect(() => {
      let timer;
      if (currentScreen === 'instructions' && instructionIndex < instructions.length - 1) {
        timer = setTimeout(() => {
          setInstructionIndex(prevIndex => prevIndex + 1);
        }, 4000); // Change instruction every 2 seconds
      }

      const handleKeyDown = (e) => {
        const code = e.code;
        console.log(code);
        if (code === "Enter" && currentScreen === "start") {
          setCurrentScreen('instructions');
        }
      };
  
      if (currentScreen === "start") {
        window.addEventListener('keydown', handleKeyDown);
      }
    
      return () => {
        clearTimeout(timer)
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [currentScreen, instructionIndex]);


    const [buttonText, setButtonText] = useState('Press the button to start')
    const [isAlternateText, setIsAlternateText] = useState(true)

    useEffect(() => {
      const intervalId = setInterval(() => {
        setIsAlternateText(prev => !prev);
      }, 3000); // Change text every 3 seconds
  
      return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
      setButtonText(isAlternateText ? 'You\'re player 003 of the day' : 'Press the button to start')
    }, [isAlternateText])
  

  
    const handleNextAfterInstructions = () => {
      setCurrentScreen('loading');
      setLoading(true);
      // Simulate loading process
      setTimeout(() => setLoading(false), 5000);
    };
  
    return (
      <div className="screens">
        <div className='top-logo'>
          {currentScreen === 'instructions' && (
            <h3>TEST YOUR<br/><span className='font-bold text-110'>TTV</span></h3>
          )}
        </div>

        {currentScreen === "start" && (
          <div className='screen main-screen'>
            <p className='mb-50'><span className='font-bold'>GE Healthcare and MIM Software</span><br/>have come together to crerate new synergies</p>
            <h1 className='text-xl uppercase'>The<br/>TTV<sup>*</sup> Challenge</h1>
            <h3 className='mb-120'>TEST YOUR TOTAL TUMOR VOLUME SPEED</h3>

            <p id='startBtn' className='uppercase font-bold'>› {buttonText}</p>
          </div>
        )}

        {currentScreen === 'instructions' && (
          // <div className='screen screen-1'>
          //   <div className="main-body">
          //     <h1 className='text-l  mb-40 uppercase'>How does it work?</h1>
          //     <p className='text-sm'>The aim of the game is to complete post-processing as fast as possible on the MIM workstation</p>
          //   </div>
          // </div>

        // <div className='screen screen-2'>
        //   <div className="main-body">
        //     <img className='width-190 mb-50' src={icon1} alt="timer" />
        //     <h1 className='text-l mb-40 uppercase'>1 › Wait for the scan</h1>
        //     <p className='text-sm'>The Omni Legend scan will begin automatically</p>
        //   </div>
        // </div>

        // <div className='screen screen-3'>
        //   <div className="main-body">
        //     <img className='width-570 mb-50' src={icon2} alt="loading bar" />
        //     <h1 className='text-l mb-40 uppercase'>2 › Prepare for<br/>the post-processing</h1>
        //     <p className='text-sm'>After the scan is complete, a countdown will begin allowing you to prepare to do the post- processing on the MIM workstation</p>
        //   </div>
        // </div>

        // <div className='screen screen-4'>
        //   <div className="main-body col-comp">
        //     <div className='col-50'>
        //       <img className='width-570 mb-50' src={icon3} alt="start button" style={{width: '163px', height: '128px'}} />
        //       <h1 className='text-m mb-40 uppercase'>3 › PRESS BUTTON TO START THE TIMER</h1>
        //       <p className='text-sm'>Start timer and proceed with post-processing on the MIM workstation</p>
        //     </div>
        //     <div className='col-50'>
        //       <img className='width-570 mb-50' src={icon3} alt="start button" style={{width: '163px', height: '128px'}}/>
        //       <h1 className='text-m mb-40 uppercase'>4 › PRESS BUTTON TO STOP THE TIMER</h1>
        //       <p className='text-sm'>When post-processing is complete, press the button again to lock in your time</p></div>
        //     </div>
        // </div>

        <div className='screen screen-5'>
          <div className="main-body">
            <img className='width-570 mb-50' src={icon4} alt="loading bar" style={{width: '330px', height: '288px'}} />
            <h1 className='text-l mb-40 uppercase'>5 › VIEW YOUR RESULTS</h1>
            <p className='text-sm'>See how fast the overall process is when using our software</p>
          </div>
        </div>

        )}
      </div>
    );
}
