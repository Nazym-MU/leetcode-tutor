import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../../../styles/Topics.css';

export const ReactJS = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const topics = [
    {
        title: "Intro to React",
        description: "Learn the basics of React",
        path: "/react/intro-to-react",
        available: false,
    },
    {
        title: "React Components",
        description: "Understand React components",
        path: "/react/react-components",
        available: false,
    },
    {
        title: "React Hooks",
        description: "Understand React hooks",
        path: "/react/react-hooks",
        available: false,
    }
  ];

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="page-title">React</h1>
        
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

export default ReactJS;