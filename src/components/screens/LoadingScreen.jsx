import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import AnimatedLoadingBar from '../AnimatedLoadingBar/AnimatedLoadingBar';

import loadingScreen from "../../assets/scan-loading.png";
import omniScan from "../../assets/omniscan.png";
import video1 from "../../assets/loading-video.mp4";

export const LoadingScreen = ({ onStartTimerShow }) => {
    const [time, setTime] = useState(0);
    const [showOmniScan, setShowOmniScan] = useState(false);
    const [showStartTimer, setShowStartTimer] = useState(false);
    const totalDuration = 8 * 60 * 1000 + 5;
    const animationDuration = 7500;

    const omniScanRef = useRef(null);
    const scanTextRef = useRef(null);
    const loadingScreenRef = useRef(null);
    const startTimerRef = useRef(null);

    useEffect(() => {
        const startTime = Date.now();
    
        const interval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const progress = Math.min(elapsedTime / animationDuration, 1);
          const newTime = Math.floor(progress * totalDuration);
          setTime(newTime);
          if (newTime >= totalDuration) {
            clearInterval(interval);
            setShowOmniScan(true);
          }
        }, 16);
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (showOmniScan) {
            // GSAP animation for the omniScan image
            gsap.fromTo(omniScanRef.current, 
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
            );

            // GSAP animation for the "Scan complete" text
            gsap.fromTo(scanTextRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, delay: 0.5, ease: "back.out(1.7)" }
            );

            // Set timer to show StartTimer screen
            const timer = setTimeout(() => {
                onStartTimerShow();
            }, 5000); 

            return () => clearTimeout(timer);
        }
    }, [showOmniScan]);

    useEffect(() => {
        if (showStartTimer) {
            // Fade out loading screen
            gsap.to(loadingScreenRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    // Fade in StartTimer screen
                    gsap.fromTo(startTimerRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                    );
                }
            });
        }
    }, [showStartTimer]);

    const formatTime = (timeInMilliseconds) => {
        const minutes = Math.floor(timeInMilliseconds / 60000);
        const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);
    
        return `${minutes.toString().padStart(2, 0)}:${seconds
          .toString()
          .padStart(2, 0)}:${milliseconds.toString().padStart(2, 0)}`;
    };

    

    return (
        <>
            <div className="screen loading-screen" ref={loadingScreenRef} style={{display: showStartTimer ? 'none' : 'block'}}>
                <div className="col-wrap">
                    {showOmniScan ? (
                        <div className="h-544 col-30 scan-text">
                            <h1 className="text-m" ref={scanTextRef}>Scan complete</h1>
                        </div>
                    ) : (
                        <div className="h-544 border-purple bkg-white col-30 col-image">
                            <img src={loadingScreen} alt="" />
                            <div className="reveal-img" />
                            <div className="scan-info">
                                <p className="text-s">1,17 MBq/kg</p>
                                <p className="text-s">BMI 29,8</p>
                            </div>
                        </div>
                    )}
                    <div className="h-544 border-purple bkg-white col-70">
                        {!showOmniScan ? (
                            <video src={video1} width="1046" height="536" autoPlay={true} />
                        ) : (
                            <img 
                                ref={omniScanRef} 
                                src={omniScan} 
                                alt="omni scan" 
                                style={{ width: "100%", opacity: 0 }}
                            />
                        )}
                    </div>
                </div>
                <div className="text-sm font-bold loadind-time">
                    <AnimatedLoadingBar />
                    {formatTime(Math.min(time, totalDuration))}
                </div>
            </div>
            

        </>
    );
}