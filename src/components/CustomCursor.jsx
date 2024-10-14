import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const hoverableElement = element && (
        element.closest('.title') ||
        element.closest('.topics-list li') ||
        element.closest('.vertical-line') ||
        element.closest('.burger-menu') ||
        element.closest('a') ||
        element.closest('.floating-ball')
      );

      if (hoverableElement) {
        const rect = hoverableElement.getBoundingClientRect();
        const isNear = 
          e.clientX >= rect.left - 10 &&
          e.clientX <= rect.right + 10 &&
          e.clientY >= rect.top - 10 &&
          e.clientY <= rect.bottom + 10;

        setIsHovering(isNear);

        if (isNear) {
          hoverableElement.classList.add('cursor-near');
        } else {
          hoverableElement.classList.remove('cursor-near');
        }
      } else {
        setIsHovering(false);
        document.querySelectorAll('.cursor-near').forEach(el => {
          el.classList.remove('cursor-near');
        });
      }
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className={`custom-cursor cursor-follower ${isHovering ? 'focus' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          '--size': isHovering ? '100px' : '30px'
        }}
      />
      <div 
        className='cursor-mask' 
        style={{ 
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default CustomCursor;