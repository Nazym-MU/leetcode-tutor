import React, { useState, useEffect } from 'react';
import ComingSoon from './ComingSoon';
import '../styles/Home.css';

const Home = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);
  const [topicsVisible, setTopicsVisible] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const topics = [
    "Data Structures", "LeetCode 75", "Calculus", "Physics", "React", "Machine Learning", "SQL", "Algebra", "Python", "Swift", "LaTeX"
  ];

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 500);
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 1000);
    const arrowTimer = setTimeout(() => setArrowVisible(true), 1500);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setTopicsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(arrowTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-page">
      {showComingSoon ? (
        <ComingSoon />
      ) : (
        <main className="content">
          <div className="center-content">
            <h1 className={`title ${titleVisible ? 'visible' : ''}`}>
              Hi, I'm <a href="https://nazym.space" target="_blank" rel="noopener noreferrer" className="name-link">Nazym</a>!
            </h1>
            <h2 className={`subtitle ${subtitleVisible ? 'visible' : ''}`}>
              Here's what I can explain:
            </h2>
            <div className={`arrow ${arrowVisible ? 'visible' : ''}`}>↓</div>
          </div>
          <div className={`topics-container ${topicsVisible ? 'visible' : ''}`}>
            <div className="topics-grid">
              {topics.map((topic, index) => (
                <button key={index} className="topic-button" onClick={() => setShowComingSoon(true)}>
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;