import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

import { HTMLContent } from "../../utils/utils";
import screenData from "../../data/screens.json";

import screen1 from "../../assets/laptop1.png";
import screen2 from "../../assets/laptop2.png";

gsap.registerPlugin(CSSPlugin);

export const StartScreen = ({userName}) => {
  const startMenu = screenData.start;
  const screen1Ref = useRef(null);
  const screen2Ref = useRef(null);

  // Change button Start =================================================
  const [buttonText, setButtonText] = useState("Press the button to start");
  const [isAlternateText, setIsAlternateText] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAlternateText((prev) => !prev);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  //ANIMATE BUTTON
  useEffect(() => {
    setButtonText(
      isAlternateText ? `You are player ${userName} of the day` : 'Press the button to start'
    );
  }, [isAlternateText]);

  //ANIMATE LAPTOPS
  useLayoutEffect(() => {
    const screen1Element = screen1Ref.current;
    const screen2Element = screen2Ref.current;

    if (screen1Element && screen2Element) {
      gsap.set([screen1Element, screen2Element], { y: 0, rotation: 0 });

      const tl = gsap.timeline({ repeat: -1 });

      // Synchronized animation for both screens
      for (let i = 0; i < 100; i++) {
        tl.to([screen1Element, screen2Element], {
          y: `-=${1}`,
          rotation: i % 2 === 0 ? 1 : 0,
          duration: 1,
          ease: "steps(1)",
        });
      }
      // Reset both screens
      tl.to([screen1Element, screen2Element], {
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "steps(1)",
      });

      return () => {
        // Cleanup animation on component unmount
        tl.kill();
      };
    }
  }, []);

  return (
    <>
      <div className="laptop-comp">
        <img
          ref={screen1Ref}
          src={screen1}
          alt="laptop 1"
          style={{ width: "316px" }}
          className="laptop laptop1"
        />
        <img
          ref={screen2Ref}
          src={screen2}
          alt="laptop 2"
          style={{ width: "316px" }}
          className="laptop laptop2"
        />
      </div>
      <div className="screen main-screen">
        <HTMLContent as="p" content={startMenu.description} className="mb-50" />
        {/* <HTMLContent as="p" content={userName} className="mb-50" /> */}
        <HTMLContent
          as="h1"
          content={startMenu.title}
          className="text-xl uppercase"
        />
        <HTMLContent as="h3" content={startMenu.subtitle} className="mb-120" />
        <div className="startBtn-comp">
          <div className="startBtn-img" />
          <HTMLContent
            as="p"
            content={`› ${buttonText}`}
            id="startBtn"
            className="uppercase font-bold"
          />
        </div>
      </div>
    </>
  );
};
