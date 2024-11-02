import React from 'react';
import Quiz from './Quiz';
import '../../styles/Template.css';

const Section = ({ title, children, className }) => {
  return (
    <div className="mb-8">
      <h2 className="section-header">
        {title}
      </h2>
      <div className={`font-indie ${className || ''}`}>
        {children}
      </div>
    </div>
  );
};

const Visualization = ({ children, instructions }) => (
  <div className="visualization-container">
    <div className="mb-4 font-indie visualization-content">
      {instructions}
    </div>
    <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
      {children}
    </div>
  </div>
);

const ExplanationTemplate = ({ 
  topic,
  description,
  sections,
  visualizations,
  quizQuestions,
  children 
}) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b z-10 p-6">
        <h1 className="section-header">{topic}</h1>
      </div>
      
      <div className="explanation-container">
        <Section title="Overview" className="overview-content">
          {description}
        </Section>

        {sections?.map((section, index) => (
          <Section key={index} title={section.title}>
            {section.content}
          </Section>
        ))}

        {visualizations?.length > 0 && (
          <Section title="Visualization" className="visualization-content">
            {visualizations.map((vis, index) => (
              <Visualization key={index} instructions={vis.instructions}>
                {vis.content}
              </Visualization>
            ))}
          </Section>
        )}

        {quizQuestions?.length > 0 && (
          <Section title="Test Your Knowledge" className="quiz-content">
            <Quiz questions={quizQuestions} />
          </Section>
        )}

        {children}
      </div>
    </div>
  );
};

Section.displayName = 'Section';
Visualization.displayName = 'Visualization';
Quiz.displayName = 'Quiz';
ExplanationTemplate.displayName = 'ExplanationTemplate';

export { ExplanationTemplate, Section, Visualization, Quiz };