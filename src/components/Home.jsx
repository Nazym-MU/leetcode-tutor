import React, { useState, useEffect } from "react";
import Header from "./Header";
import ComingSoon from "./ComingSoon";
import { motion } from "framer-motion";

const topics = [
    "LeetCode 75", "Computer Science Basics", "Calculus", "Physics", "HTML", "JavaScript", "React", "Machine Learning", "SQL", "Algebra", "Python", "Swift", "LaTeX"
];

const MovingTopics = ({ direction, topics }) => (
    <div className="overflow-hidden whitespace-nowrap my-4">
        <motion.div
            className="inline-block"
            animate={{ x: direction === "left" ? [0,1000] : [1000,0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
            {topics.map((topic, index) => (
                <motion.button
                    key={index}
                    className="inline-block mx-2 px-6 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => window.location.href = `/topic/${topic.toLowerCase().replace(' ', '-')}`}
                >
                    {topic}
                </motion.button>
            ))}
        </motion.div>
    </div>
)

const HomePage = () => {
    const [showComingSoon, setShowComingSoon] = useState(false);
  
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        {showComingSoon ? (
          <ComingSoon />
        ) : (
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center my-8">I want to understand...</h1>
            <MovingTopics direction="right" topics={topics.slice(0, 5)} />
            <MovingTopics direction="left" topics={topics.slice(5, 10)} />
            <MovingTopics direction="right" topics={topics.slice(10)} />
          </main>
        )}
      </div>
    );
  };
  
  export default HomePage;