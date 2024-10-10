import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import loadBar from "../../assets/loadBarMain.png";
import cap from "../../assets/cap_image.png";
import startCap from "../../assets/start-cap_image.png";
import endCap from "../../assets/end-cap_image.png";

const PixelLoadingBar = ({ totalPixels = 16, animationDuration = 11 }) => {
  const [activePixels, setActivePixels] = useState(0);
  const pixelsRef = useRef([]);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.to(pixelsRef.current, {
      opacity: 1,
      duration: 1,
      stagger: animationDuration / totalPixels,
      onUpdate: () => {
        setActivePixels(Math.floor(timeline.progress() * totalPixels));
      },
    });

    return () => timeline.kill();
  }, [totalPixels, animationDuration]);

  const getImageUrl = (index) => {
    if (index === 0) return startCap;
    if (index === totalPixels - 1) return endCap;
    return cap;
  };

  return (
    <div style={{ width: "400px", position: "relative", padding: '2px' }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: '2px',
          justifyContent: "space-between",
          paddingTop: '5px'
        }}
      >
        {[...Array(totalPixels)].map((_, index) => (
          <img
            key={index}
            ref={el => pixelsRef.current[index] = el}
            src={getImageUrl(index)}
            alt={`Loading pixel ${index + 1}`}
            style={{
              width: `calc((100% - ${(totalPixels - 1) * 2}px) / ${totalPixels})`,
              height: "34px",
              opacity: 0,
            }}
          />
        ))}
      </div>
      <img
        src={loadBar}
        style={{ position: "absolute", top: "0", left: "0" }}
      />
    </div>
  );
};

export default PixelLoadingBar;
