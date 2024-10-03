import React, { useState, useEffect } from 'react';
import loadBar from '../../assets/loadBarMain.png';
import fullbar from '../../assets/100.png';
import bar75 from '../../assets/75.png';
import bar50 from '../../assets/50.png';
import bar25 from '../../assets/25.png';
import './AnimatedLoadingBar.css';

const AnimatedLoadingBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 25; 
      });
    }, 1800); 

    return () => clearInterval(interval);
  }, []);

  const getProgressBar = () => {
    if (progress >= 100) return fullbar;
    if (progress >= 75) return bar75;
    if (progress >= 50) return bar50;
    if (progress >= 25) return bar25;
    return null;
  };

  return (
    <div className="bar-comp">
      {getProgressBar() && (
        <img 
          className={`progress-bar bar-${progress}`} 
          src={bar25} 
          alt={`${progress}% loaded`} 
        />
      )}
      <img className='main-bar' src={loadBar} alt="load bar" />
    </div>
  );
};

export default AnimatedLoadingBar;