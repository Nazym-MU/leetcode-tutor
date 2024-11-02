import React, { useState } from 'react';
import '../../styles/Template.css';

const Section = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h2 className="section-header">
        {title}
      </h2>
      <div className="font-indie">
        {children}
      </div>
    </div>
  );
};

const Visualization = ({ children, instructions }) => (
  <div className="visualization-container">
    <div className="mb-4 font-indie text-gray-600">
      {instructions}
    </div>
    <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
      {children}
    </div>
  </div>
);

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <div className="visualization-container text-center">
        <h3 className="section-header">Quiz Complete!</h3>
        <p className="font-indie text-lg mb-4">
          You scored {score} out of {questions.length}
        </p>
        <button
          onClick={resetQuiz}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-indie hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="visualization-container">
      <div className="mb-4">
        <span className="font-indie text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>
      <h3 className="section-header">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={showFeedback}
            className={`w-full text-left p-3 rounded-lg font-indie transition-colors
              ${selectedAnswer === option 
                ? option === question.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : 'bg-red-100 border-red-500'
                : 'bg-white hover:bg-gray-100'
              } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className="mt-4">
          <p className="font-indie mb-4">
            {selectedAnswer === question.correctAnswer 
              ? "Correct! " 
              : "Incorrect. "} 
            {question.explanation}
          </p>
          <button
            onClick={nextQuestion}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-indie hover:bg-blue-600"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
};

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

        {quizQuestions?.length > 0 && (
          <Section title="Test Your Knowledge">
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