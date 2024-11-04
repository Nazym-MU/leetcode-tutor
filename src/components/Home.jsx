import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);
  const [topicsVisible, setTopicsVisible] = useState(false);
  const navigate = useNavigate();

  const topicsRef = useRef(null);

  const topics = [
    "Data Structures", "LeetCode", "Calculus", "Physics", "SQL", "LaTeX", "React"
  ];

  const handleTopicClick = (topic) => {
    if (topic === "Data Structures") {
      navigate('/data-structures');
    } else
    if (topic === "LeetCode") {
      navigate('/leetcode');
    }
  };

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 500);
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 1000);
    const arrowTimer = setTimeout(() => setArrowVisible(true), 1500);

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
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

  useEffect(() => {
    if (topicsVisible && topicsRef.current) {
      const topicElements = topicsRef.current.querySelectorAll('.topic-text');
      topicElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
      });
    }
  }, [topicsVisible]);

  return (
    <div className="home-page">
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
        <div className={`topics-container ${topicsVisible ? 'visible' : ''}`} ref={topicsRef}>
          <div className="fun-container">
            <ul className="topics-list">
              {topics.map((topic, index) => (
                <li key={index} className="topic-item" onClick={() => handleTopicClick(topic)}>
                  <span className="topic-text">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;