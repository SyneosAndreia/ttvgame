import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from "gsap/CSSPlugin";
import AnimatedLoadingBar from '../AnimatedLoadingBar/AnimatedLoadingBar';

import loadingScreen from "../../assets/scan-loading.png";
import omniScan from "../../assets/omniscan.png";
import video1 from "../../assets/loading-video.mp4";
import { formatTime } from '../../utils/utils';

gsap.registerPlugin(CSSPlugin);

export const LoadingScreen = ({ onStartTimerShow }) => {
    const [time, setTime] = useState(0);
    const [showOmniScan, setShowOmniScan] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const totalDuration = 8 * 60 * 1000 + 5;
    const animationDuration = 11000;

    const omniScanRef = useRef(null);
    const scanTextRef = useRef(null);
    const loadingScreenRef = useRef(null);
    const startTimerRef = useRef(null);
    const loadingVideo = useRef(null);

    const loadingRef = useRef(null);
    const scanRef = useRef(null);
    const dotsRef = useRef([]);

    // Timer and state management for the loading and scan complete
    useEffect(() => {
        const startTime = Date.now();
    
        const interval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const progress = Math.min(elapsedTime / animationDuration, 1);
          const newTime = Math.floor(progress * totalDuration);

          setTime(newTime);
          if (newTime >= totalDuration) {
            setShowLoading(false);
            clearInterval(interval);
          }
        }, 16);
    
        return () => clearInterval(interval);
    }, []);

    // Animations for OmniScan
    useEffect(() => {
        if (showOmniScan) {
            gsap.fromTo(scanTextRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
            gsap.fromTo(omniScanRef.current, 
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1, delay: .5, ease: "power2.out" }
            );
            // Show timer after a delay
            const timer = setTimeout(() => {
                onStartTimerShow();
            }, 10000); 

            return () => clearTimeout(timer);
        }
    }, [showOmniScan, onStartTimerShow]);

    // Animation effect for Loading and Scan Complete
    useEffect(() => {
        if (showLoading) {
            // Loading Animation
            const tlLoading = gsap.timeline();
            const loadingText = loadingRef.current;
            const dots = dotsRef.current;

            // Loading text animation
            tlLoading.to(loadingText, {
                y: -5,
                repeat: -1,
                yoyo: true,
                duration: 0.5,
                ease: "power1.inOut"
            });

            // Dots animation
            dots.forEach((dot, index) => {
                tlLoading.to(dot, {
                    scale: 1.5,
                    duration: 0.4,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 0.1
                }, 0);
            });

            return () => {
                tlLoading.kill();
            };
        } else {
            // Scan Complete Animation
            const tlScanComplete = gsap.timeline();
            const scanComplete = scanRef.current;

            // Scan complete animation
            tlScanComplete.fromTo(scanComplete, 
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power1.inOut", yoyo: true, repeat: -1 }
            );

            return () => {
                tlScanComplete.kill();
            };
        }
    }, [showLoading]);


    

    return (
        <div className="screen loading-screen" ref={loadingScreenRef}>
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
                <div className="h-544 border-purple bkg-black col-70">
                    {!showOmniScan ? (
                        <video src={video1} ref={loadingVideo} width="100%" autoPlay />
                    ) : (
                        <img 
                            ref={omniScanRef} 
                            src={omniScan} 
                            alt="omni scan" 
                            style={{ width: "100%" }}
                        />
                    )}
                </div>
            </div>
            <div className='loading-time_comp'>
                <div className='loading-time_text'>
                    {showLoading ?
                    <>
                        <p ref={loadingRef}>Loading</p>
                        <p>
                            {[0, 1, 2].map((_, index) => (
                                <span
                                    key={index}
                                    ref={el => dotsRef.current[index] = el}
                                    style={{ display: 'inline-block', marginLeft: '2px' }}
                                >
                                .
                                </span>
                            ))}
                        </p> 
                    </>
                    :
                    <p ref={scanRef}>Scan Complete!</p>
                    }
                </div>
                <div ref={startTimerRef} className="text-sm font-bold loadind-time">
                    <AnimatedLoadingBar />
                    {formatTime(Math.min(time, totalDuration))}
                </div>
            </div>
        </div>
    );
};
