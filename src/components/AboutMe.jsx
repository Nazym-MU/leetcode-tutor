import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingBall = ({ text, onClick, x, y }) => (
  <motion.div
    className="floating-ball"
    style={{ x, y }}
    whileHover={{ scale: 1.1 }}
    onClick={onClick}
  >
    {text}
  </motion.div>
);

const AboutMe = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <motion.div
      className="about-me-page"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!showAbout && !showContact && (
        <>
          <FloatingBall 
            text="About me" 
            onClick={() => setShowAbout(true)} 
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
          />
          <FloatingBall 
            text="Contact me" 
            onClick={() => setShowContact(true)} 
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
          />
        </>
      )}
      
      {showAbout && (
        <>
          <FloatingBall 
            text="Website" 
            onClick={() => window.open('https://nazym.space', '_blank')}
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
          />
          <FloatingBall 
            text="GitHub" 
            onClick={() => window.open('https://github.com/yourusername', '_blank')}
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
          />
        </>
      )}
      
      {showContact && (
        <>
          <FloatingBall 
            text="Email" 
            onClick={() => window.location.href = 'mailto:your.email@example.com'}
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
          />
          <FloatingBall 
            text="LinkedIn" 
            onClick={() => window.open('https://www.linkedin.com/in/yourprofile', '_blank')}
            x={Math.random() * window.innerWidth}
            y={Math.random() * window.innerHeight}
          />
        </>
      )}
    </motion.div>
  );
};

export default AboutMe;