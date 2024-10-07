import React, { useEffect, useRef } from "react";
import { formatTime } from "../../utils/utils";

const AnimatedBanner = ({ topPlayers }) => {
    const bannerRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    let position = banner.offsetWidth;

    const animate = () => {
      position--;
      banner.style.transform = `translateX(${position}px)`;

      if (position < -banner.offsetWidth) {
        position = banner.offsetWidth;
      }

      console.log(banner.offsetWidth)

      requestAnimationFrame(animate);
    };

    animate();
  }, []);


  const renderPlayerScores = () => {
    return (
        <>
            <p>Highest Score:&nbsp;&nbsp;</p>
            {topPlayers && topPlayers.map((player, index) => (
                <p key={player.id} className={`text-m`}>
                    <span className="underline uppercase">
                        Player {player.name}
                    </span>
                    &nbsp;
                    <span className="player-score">{formatTime(player.score)}</span>{" "}
                    {index < topPlayers.length - 1 && <span>/&nbsp;</span>}
                </p>
          ))}
        </>
    )
  }

  return (
    <div className="ranking-bar">
      <div className="ranking-bar_score" ref={bannerRef}>
        {renderPlayerScores()}        
      </div>
    </div>
  );
};

export default AnimatedBanner;
