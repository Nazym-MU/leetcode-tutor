import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../../../styles/Topics.css';

export const DataStructures = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const topics = [
    {
      title: "Heap",
      description: "Complete binary tree data structure with heap property",
      path: "/data-structures/heap",
      available: true
    },
    {
      title: "Binary Search Tree",
      description: "Tree data structure with ordered nodes",
      path: "/data-structures/bst",
      available: false
    }
  ];

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="page-title">Data Structures</h1>
        
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

export default DataStructures;