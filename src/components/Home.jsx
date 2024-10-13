import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComingSoon from './ComingSoon';
import '../styles/Home.css';

const topics = [
    "LeetCode 75", "Calculus", "Physics", "HTML", "JavaScript", "React", "Machine Learning", "SQL", "Algebra", "Python", "Swift", "LaTeX"
];

const BurgerMenu = ({ isOpen, toggleMenu }) => (
  <div className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <div className="burger-line"></div>
      <div className="burger-line"></div>
      <div className="burger-line"></div>
  </div>
);

const Menu = ({ isOpen, toggleMenu }) => (
  <AnimatePresence>
      {isOpen && (
          <motion.div
              className="menu"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
          >
              <nav>
                  <ul>
                      <li><a href="#about">About me</a></li>
                      <li><a href="#timeline">Timeline</a></li>
                      <li><a href="#contact">Contact</a></li>
                  </ul>
              </nav>
          </motion.div>
      )}
  </AnimatePresence>
);


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
      <div className="home-page">
          <BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
          
          {showComingSoon ? (
              <ComingSoon />
          ) : (
              <main className="content">
                  <div className="center-content">
                      <h1 className="title">Please Explain</h1>
                      <div className="vertical-line"></div>
                  </div>
                  <ul className="topics-list">
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