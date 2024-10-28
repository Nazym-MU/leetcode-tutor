import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Section = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Card className="mb-6 border-none shadow-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-xl font-sketch bg-gray-50 rounded-t-lg"
        aria-expanded={isOpen}
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

// FAQ component for additional questions
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
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b z-10 p-6">
        <h1 className="text-4xl mb-4 font-sketch">{topic}</h1>
      </div>
      
      <div className="max-w-4xl mx-auto p-6">
        <Section title="Overview">
          {description}
        </Section>

        {sections?.map((section, index) => (
          <Section key={index} title={section.title}>
            {section.content}
          </Section>
        ))}

        {visualizations?.length > 0 && (
          <Section title="Interactive Visualizations">
            {visualizations.map((vis, index) => (
              <Visualization key={index} instructions={vis.instructions}>
                {vis.content}
              </Visualization>
            ))}
          </Section>
        )}

        {faqs?.length > 0 && (
          <Section title="Frequently Asked Questions">
            <FAQ questions={faqs} />
          </Section>
        )}

        {children}
      </div>
    </div>
  );
};

Section.displayName = 'Section';
Visualization.displayName = 'Visualization';
FAQ.displayName = 'FAQ';
ExplanationTemplate.displayName = 'ExplanationTemplate';

export { ExplanationTemplate, Section, Visualization, FAQ };