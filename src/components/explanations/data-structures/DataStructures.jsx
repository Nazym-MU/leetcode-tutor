import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '../../ui/card';
import { Search } from 'lucide-react';

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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-6 font-sketch">Data Structures</h1>
        
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search topics..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg font-sketch"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredTopics.map((topic, index) => (
            <Card 
              key={index}
              className={`transition-all hover:shadow-lg ${
                topic.available ? 'cursor-pointer' : 'opacity-50'
              }`}
            >
              {topic.available ? (
                <Link to={topic.path}>
                  <CardHeader>
                    <CardTitle className="font-sketch">{topic.title}</CardTitle>
                    <p className="text-gray-600 font-sketch">{topic.description}</p>
                  </CardHeader>
                </Link>
              ) : (
                <CardHeader>
                  <CardTitle className="font-sketch">
                    {topic.title} <span className="text-sm">(Coming Soon)</span>
                  </CardTitle>
                  <p className="text-gray-600 font-sketch">{topic.description}</p>
                </CardHeader>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};