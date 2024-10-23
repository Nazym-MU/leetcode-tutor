import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const TopicHeader = ({ title, onSearch }) => (
  <div className="sticky top-0 bg-white border-b z-10 p-6">
    <h1 className="text-4xl mb-4 font-sketch">{title}</h1>
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search topics..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 pl-10 border rounded-lg font-sketch"
      />
      <Search className="absolute left-3 top-3 text-gray-400" size={20} />
    </div>
  </div>
);

const Section = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="mb-6 border-none shadow-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-xl font-sketch bg-gray-50 rounded-t-lg"
      >
        {title}
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && (
        <CardContent className="p-4 font-sketch">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

const Visualization = ({ children, instructions }) => (
  <div className="border rounded-lg p-4 my-4">
    <div className="mb-4 font-sketch text-gray-600">
      {instructions}
    </div>
    <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
      {children}
    </div>
  </div>
);

const FAQ = ({ questions }) => (
  <div className="space-y-4">
    {questions.map((qa, index) => (
      <Section key={index} title={qa.question}>
        {qa.answer}
      </Section>
    ))}
  </div>
);

const ExplanationTemplate = ({ 
  topic,
  description,
  sections,
  visualizations,
  faqs,
  children 
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <TopicHeader title={topic} onSearch={setSearchQuery} />
      
      <div className="max-w-4xl mx-auto p-6">
        <Section title="Overview">
          {description}
        </Section>

        {sections.map((section, index) => (
          <Section key={index} title={section.title}>
            {section.content}
          </Section>
        ))}

        {visualizations && (
          <Section title="Interactive Visualizations">
            {visualizations.map((vis, index) => (
              <Visualization key={index} instructions={vis.instructions}>
                {vis.content}
              </Visualization>
            ))}
          </Section>
        )}

        {faqs && (
          <Section title="Frequently Asked Questions">
            <FAQ questions={faqs} />
          </Section>
        )}

        {children}
      </div>
    </div>
  );
};

export { ExplanationTemplate, Section, Visualization, FAQ };