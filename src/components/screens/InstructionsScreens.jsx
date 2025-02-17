import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { HTMLContent } from "../../utils/utils";
import icon3 from "../../assets/button.png";
import screenData from "../../data/screens.json";

export const InstructionsScreens = ({
  onInstructionsComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const instruction = screenData.instructions[currentIndex];

  // Refs for animating elements
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const leftIconRef = useRef(null);
  const leftTitleRef = useRef(null);
  const leftDescriptionRef = useRef(null);
  const rightIconRef = useRef(null);
  const rightTitleRef = useRef(null);
  const rightDescriptionRef = useRef(null);

  useEffect(() => {
    // Fade in animation
    const fadeIn = (element, delay = 0) => {
      if(element) {
        gsap.fromTo(
          element,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, delay }
        );
      }
    };
    const fadeTitle = (element, delay = 0) => {
      if(element) {
        gsap.fromTo(
          element,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.5, delay }
        );
      }
    };

    // Animate elements
    if (!Array.isArray(instruction.title)) {
      fadeIn(iconRef.current, 0);
      fadeTitle(titleRef.current, 0.2);
      fadeIn(descriptionRef.current, 0.4);
    } else {
      fadeIn(leftIconRef.current, 0);
      fadeTitle(leftTitleRef.current, 0.2);
      fadeIn(leftDescriptionRef.current, 0.4);
      fadeIn(rightIconRef.current, 0.2);
      fadeIn(rightTitleRef.current, 0.4);
      fadeIn(rightDescriptionRef.current, 0.6);
    }


    const calculateDuration = () => {
      if (screenData.instructions[currentIndex] === screenData.instructions[0] || 
          screenData.instructions[currentIndex] === screenData.instructions[4]) {
        return 7000;
      } else if (screenData.instructions[currentIndex] === screenData.instructions[3]) {
        return 20000;
      } else if (screenData.instructions[currentIndex] === screenData.instructions[2]) {
        return 15000;
      }else {
        return 10000;
      }
    };

    const duration = calculateDuration()

    const timer = setTimeout(
      () => {
        if (currentIndex < screenData.instructions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onInstructionsComplete();
        }
      },100);

    return () => clearTimeout(timer);
  }, [currentIndex, instruction.title, onInstructionsComplete]);

  return (
    <div className="screen screen-1">
      <div className="main-body">
        {!Array.isArray(instruction.title) ? (
          <>
            {instruction.icon && (
              <img
                ref={iconRef}
                className="mb-50"
                style={{ width: instruction.width }}
                src={require(`../../assets/${
                  Array.isArray(instruction.icon)
                    ? instruction.icon[0]
                    : instruction.icon
                }`)}
                alt={
                  Array.isArray(instruction.title)
                    ? instruction.title[0]
                    : instruction.title
                }
              />
            )}
            <HTMLContent
              ref={titleRef}
              as="h1"
              content={instruction.title}
              className="text-l mb-40 uppercase"
            />
            <HTMLContent
              ref={descriptionRef}
              as="p"
              content={instruction.description}
              className="text-sm"
            />
          </>
        ) : (
          <div className="main-body col-comp">
            <div className="col-50">
              <img
                ref={leftIconRef}
                className="width-570 mb-50"
                src={icon3}
                alt="start button"
                style={{ width: "163px", height: "128px" }}
              />
              <HTMLContent
                ref={leftTitleRef}
                as="h1"
                content={instruction.title[0]}
                className="text-m mb-40 uppercase"
              />
              <HTMLContent
                ref={leftDescriptionRef}
                as="p"
                content={instruction.description[0]}
                className="text-sm"
              />
            </div>
            <div className="col-50">
              <img
                ref={rightIconRef}
                className="width-570 mb-50"
                src={icon3}
                alt="start button"
                style={{ width: "163px", height: "128px" }}
              />
              <HTMLContent
                ref={rightTitleRef}
                as="h1"
                content={instruction.title[1]}
                className="text-m mb-40 uppercase"
              />
              <HTMLContent
                ref={rightDescriptionRef}
                as="p"
                content={instruction.description[1]}
                className="text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
