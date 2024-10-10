import React, { useEffect, useRef, useState } from "react";
import { formatTime } from "../../utils/utils";

const AnimatedBanner = ({ topPlayers }) => {
    const bannerRef = useRef(null);
    const [position, setPosition] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect (() => {
        if(bannerRef.current) {
            setContainerWidth(bannerRef.current.offsetWidth)
        }

        const moveBanner = () => {
            setPosition(prevPosition => {
                if(prevPosition <= -containerWidth) {
                    return 0;
                }

                return prevPosition - 1
            })
        }

        const interval = setInterval(moveBanner, 16)

        return () => clearInterval(interval);
    }, [containerWidth])


    const renderPlayerScores = () => (
        <>
            <p className="ranking-title uppercase">HIGH SCORE </p>
            {topPlayers && (
                <p key={topPlayers[0].id} className='ranking-copy text-m uppercase font-bold'>
                    <span className="ranking-player">Player {topPlayers[0].name}</span><span className="ranking-score">{formatTime(topPlayers[0].score)}</span>
                </p>
            )}
        </>
    );

    return (
        <div className="ranking-bar_component">
            <div className="ranking-bar" ref={bannerRef} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <div className="ranking-bar_score" style={{ 
                    position: 'absolute',
                    transform: `translateX(${position}px)`, 
                    width: `${containerWidth}px`, // Set width to container width
                    display: 'inline-block',
                    whiteSpace: 'nowrap' }}>
                    {renderPlayerScores()}
                </div>
                <div className="ranking-bar_score" style={{ 
                    position: 'absolute',
                    transform: `translateX(${position + containerWidth}px)`, 
                    width: `${containerWidth}px`, // Set width to container width
                    display: 'inline-block',
                    whiteSpace: 'nowrap' }}>
                    {renderPlayerScores()} 
                </div>
            </div>
        </div>
    );
};

export default AnimatedBanner;
