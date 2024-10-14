import React, { useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';
import ComingSoon from './ComingSoon';
import '../styles/Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const topics = [
    "LeetCode 75", "Calculus", "Physics", "HTML", "JavaScript", "React", "Machine Learning", "SQL", "Algebra", "Python", "Swift", "LaTeX"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="home-page">
      <CustomCursor />
      <div className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>
      
      {showComingSoon ? (
        <ComingSoon />
      ) : (
        <main className="content">
          <div className="center-content">
            <h1 className={`title ${isVisible ? 'visible' : ''}`}>
              Please Explain
            </h1>
            <div className={`vertical-line ${isVisible ? 'visible' : ''}`} />
          </div>
          <ul className={`topics-list ${isVisible ? 'visible' : ''}`}>
            {topics.map((topic, index) => (
              <li key={index} onClick={() => setShowComingSoon(true)}>
                {topic}
              </li>
            ))}
          </ul>
        </main>
      )}
    </div>
  );
};

export default Home;