import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../../../styles/Topics.css';

export const Algorithms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const topics = [
    {
      title: "Sorting",
      description: "Algorithms for sorting arrays",
      path: "/algorithms/Sorting",
      available: true
    },
    {
      title: "Searching",
      description: "Algorithms for searching elements",
      path: "/algorithms/searching",
      available: false
    },
    {
      title: "Recursion",
      description: "Algorithms using recursive functions",
      path: "/algorithms/recursion",
      available: false
    },
    {
      title: "Dynamic Programming",
      description: "Algorithms for optimization problems",
      path: "/algorithms/dynamic-programming",
      available: false
    },
    {
      title: "Greedy Algorithms",
      description: "Algorithms for optimization problems",
      path: "/algorithms/greedy-algorithms",
      available: false
    },
    {
      title: "Backtracking",
      description: "Algorithms for optimization problems",
      path: "/algorithms/backtracking",
      available: false
    },
    {
      title: "Bit Manipulation",
      description: "Algorithms for bitwise operations",
      path: "/algorithms/bit-manipulation",
      available: false
    },
  ];

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="page-title">Algorithms</h1>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search topics..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" size={20} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.map((topic, index) => (
            <div key={index} className={`topic-card ${!topic.available ? 'unavailable' : ''}`}>
              {topic.available ? (
                <Link to={topic.path} className="block">
                  <div className="topic-header">
                    <h3 className="topic-title">{topic.title}</h3>
                    <p className="topic-description">{topic.description}</p>
                  </div>
                </Link>
              ) : (
                <div className="topic-header">
                  <h3 className="topic-title">
                    {topic.title}
                    <span className="coming-soon-badge">(Coming Soon)</span>
                  </h3>
                  <p className="topic-description">{topic.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Algorithms;