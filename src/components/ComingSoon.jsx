import React, { useEffect, useRef } from 'react';
import '../styles/ComingSoon.css';

const ComingSoon = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    let x = 0;
    let y = 0;
    let xSpeed = 2;
    let ySpeed = 2;

    const animate = () => {
      const rect = text.getBoundingClientRect();
      const parentRect = text.parentElement.getBoundingClientRect();

      if (rect.right >= parentRect.right || rect.left <= parentRect.left) {
        xSpeed = -xSpeed;
      }
      if (rect.bottom >= parentRect.bottom || rect.top <= parentRect.top) {
        ySpeed = -ySpeed;
      }

      x += xSpeed;
      y += ySpeed;

      text.style.transform = `translate(${x}px, ${y}px)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="coming-soon">
      <div ref={textRef} className="bounce-text">
        Coming Soon
      </div>
    </div>
  );
};

export default ComingSoon;