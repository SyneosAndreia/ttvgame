import React from 'react';
import icon3 from "../../assets/button.png";

export const StartTimer = () => {
    return (
      <div className="screen startTimer">
        <img
          className="width-570 mb-50"
          src={icon3}
          alt="start button"
          style={{ width: "163px", height: "128px" }}
        />
        <h1>› Press the button to start the timer </h1>
        <h1>› Proceed with post-processing on the MIM workstation</h1>
      </div>
    );
};