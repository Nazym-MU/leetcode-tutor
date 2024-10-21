import React, { useEffect, useRef } from 'react';
import '../styles/ComingSoon.css';

const ComingSoon = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    let x = 0;
    let y = 0;
    let xSpeed = 2;
    let ySpeed = 2;

    const animate = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const textWidth = text.clientWidth;
      const textHeight = text.clientHeight;

      x += xSpeed;
      y += ySpeed;

      if (x <= 0 || x + textWidth >= containerWidth) {
        xSpeed = -xSpeed;
        x = Math.max(0, Math.min(x, containerWidth - textWidth));
      }
      if (y <= 0 || y + textHeight >= containerHeight) {
        ySpeed = -ySpeed;
        y = Math.max(0, Math.min(y, containerHeight - textHeight));
      }

      text.style.transform = `translate(${x}px, ${y}px)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="coming-soon" ref={containerRef}>
      <div ref={textRef} className="bounce-text">
        Coming Soon
      </div>
    </div>
  );
};

export default ComingSoon;