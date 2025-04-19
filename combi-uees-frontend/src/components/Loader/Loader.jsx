import React, { useEffect, useRef } from "react";
import { words } from "./data";
import { gsap } from "gsap";

import "../../../css/Loader.css";

const Loader = () => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const progressNumberRef = useRef(null);
  const wordGroupsRef = useRef(null);

  useEffect(() => {
    gsap.to(wordGroupsRef.current, {
      yPercent: -10,
      duration: 2,
      ease: "power3.inOut",
    });

    gsap.from(progressRef.current, {
      scaleX: 1,
      duration: 2,
      ease: "Power3.inOut",
    });
  }, []);

  return (
    <div className="loader__wrapper" ref={loaderRef}>
      <div className="loader__proegressWrapper">
        <div className="loader__progress" ref={progressRef}>
          <span className="loader__progressNumber" ref={progressNumberRef}>
            0
          </span>
        </div>
        <div className="loader">
          <div className="loader__words">
            <div className="loader__overlay"></div>
            <div className="loader__wordsGroup" ref={wordGroupsRef}>
              {words.map((word, index) => {
                return (
                  <span key={index} className="loader__word">
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
