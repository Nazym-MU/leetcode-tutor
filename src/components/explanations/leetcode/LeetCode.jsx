import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const LeetCode = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopics, setSelectedTopics] = useState([]);
  
  const problems = [
    {
      id: 1590,
      title: "Make Sum Divisible by P",
      difficulty: "medium",
      topics: ["Array", "Hash Table", "Prefix Sum"],
      path: "/leetcode/1590",
      available: false
    },
  ];

  const allTopics = [...new Set(problems.flatMap(problem => problem.topics))].sort();

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800"
  };

  const toggleTopic = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const filteredProblems = problems
    .filter(problem => 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedDifficulty === "all" || problem.difficulty === selectedDifficulty) &&
      (selectedTopics.length === 0 || selectedTopics.some(topic => problem.topics.includes(topic)))
    )
    .sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="page-title">LeetCode Problems</h1>
        
        <div className="mb-6 space-y-4">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search problems..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <Search className="search-icon" size={20} />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Difficulty</h3>
              <div className="flex gap-2">
                {["all", "easy", "medium", "hard"].map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedDifficulty === difficulty
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {allTopics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTopics.includes(topic)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className={`topic-card ${!problem.available ? 'unavailable' : ''}`}>
              {problem.available ? (
                <Link to={problem.path} className="block">
                  <div className="topic-header">
                    <h3 className="topic-title">
                      {problem.id}. {problem.title}
                    </h3>
                    <div className="mt-2 space-y-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${difficultyColors[problem.difficulty]}`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {problem.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="topic-header">
                  <h3 className="topic-title">
                    {problem.id}. {problem.title}
                    <span className="coming-soon-badge">(Coming Soon)</span>
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeetCode;