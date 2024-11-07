import React, { useState, useEffect } from 'react';
import { ExplanationTemplate } from '../../reusable/ExplanationTemplate';
import { Search, X } from 'lucide-react';
import { Card } from '../../ui/card';
import { latexFormulas, categories } from './latexFormulas';
import LatexPlayground from './LatexPlayground';
import katex from 'katex';

const SearchResultModal = ({ formula, onClose }) => {
    if (!formula) return null;
    
    const renderLatex = (tex) => {
      try {
        return katex.renderToString(tex, {
          throwOnError: false,
          displayMode: true
        });
      } catch (e) {
        return tex;
      }
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-[32rem] max-h-[80vh] overflow-y-auto p-6 bg-white shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-sketch text-2xl">{formula.name}</h3>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="font-indie space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-sketch text-lg mb-2">Syntax</h4>
              <code className="font-mono bg-white px-2 py-1 rounded">{formula.syntax}</code>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-sketch text-lg mb-2">Example</h4>
              <code className="font-mono bg-white px-2 py-1 rounded">{formula.example}</code>
              <div className="mt-2">
                Renders as:
                <div className="mt-2 flex justify-center">
                  <div dangerouslySetInnerHTML={{ __html: renderLatex(formula.example) }} />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-sketch text-lg mb-2">Description</h4>
              <p>{formula.description}</p>
            </div>
            {formula.tips && (
              <div>
                <h4 className="font-sketch text-lg mb-2">Tips</h4>
                <ul className="list-disc pl-5">
                  {formula.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  };

export const LaTeX = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFormula, setSelectedFormula] = useState(null);
    const [filteredFormulas, setFilteredFormulas] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
  
    useEffect(() => {
      setFilteredFormulas(latexFormulas);
    }, []);
  
    const handleSearch = (e) => {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);
      
      const filtered = latexFormulas.filter(formula => 
        (selectedCategory === 'all' || formula.category === selectedCategory) &&
        (formula.name.toLowerCase().includes(term) ||
         formula.description.toLowerCase().includes(term))
      );
      
      setFilteredFormulas(filtered);
    };
  
    const handleCategoryChange = (categoryId) => {
      setSelectedCategory(categoryId);
      const filtered = latexFormulas.filter(formula =>
        (categoryId === 'all' || formula.category === categoryId) &&
        (formula.name.toLowerCase().includes(searchTerm) ||
         formula.description.toLowerCase().includes(searchTerm))
      );
      setFilteredFormulas(filtered);
    };
  
    const latexContent = {
      topic: "LaTeX Learning Platform",
      description: "Master LaTeX through interactive examples and practice. LaTeX is a powerful typesetting system used widely in academia and scientific documentation.",
      sections: [
        {
          title: "LaTeX Playground",
          content: (
            <div>
              <p className="content-paragraph">
                Write LaTeX expressions in the editor below and see them rendered in real-time. Try copying some examples from the function list!
              </p>
              <LatexPlayground />
            </div>
          )
        },
        {
          title: "Common LaTeX Functions",
          content: (
            <div>
              <div className="space-y-4">
                <div className="search-container">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Search for LaTeX functions..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === 'all'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-full text-xl whitespace-nowrap ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      title={category.description}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {filteredFormulas.map((formula, index) => (
                  <Card 
                    key={index}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedFormula(formula)}
                  >
                    <h3 className="font-sketch text-xl mb-2">{formula.name}</h3>
                    <code className="font-mono text-xl bg-gray-50 px-2 py-1 rounded">
                      {formula.syntax}
                    </code>
                    <div className="mt-2 font-indie text-xl text-gray-600">
                      {formula.description.slice(0, 100)}...
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        }
      ],
    visualizations: [],
    quizQuestions: [
      {
        question: "Which command is used to create a fraction in LaTeX?",
        options: [
          "\\frac{numerator}{denominator}", 
          "\\fraction(numerator,denominator)", 
          "\\div{numerator}{denominator}"
        ],
        correctAnswer: "\\frac{numerator}{denominator}",
        explanation: "The \\frac command is used with curly braces {} to separate the numerator and denominator."
      },
      {
        question: "How do you create a square root in LaTeX?",
        options: [
          "\\sqrt{content}",
          "\\root{content}",
          "\\squareroot{content}"
        ],
        correctAnswer: "\\sqrt{content}",
        explanation: "The \\sqrt command is used to create square roots in LaTeX."
      },
      {
        question: "Which symbol is used to separate columns in a LaTeX matrix?",
        options: [
          "&",
          "|",
          ","
        ],
        correctAnswer: "&",
        explanation: "The & symbol is used to separate columns in LaTeX matrices."
      },
      {
        question: "How do you add a subscript in LaTeX?",
        options: [
          "Using _{subscript}",
          "Using ^{subscript}",
          "Using \\sub{subscript}"
        ],
        correctAnswer: "Using _{subscript}",
        explanation: "The underscore _ followed by curly braces {} is used to create subscripts in LaTeX."
      },
      {
        question: "What is the correct way to write a double integral in LaTeX?",
        options: [
          "\\iint",
          "\\int\\int",
          "\\doubleint"
        ],
        correctAnswer: "\\iint",
        explanation: "The \\iint command is used to create a double integral symbol in LaTeX."
      }
    ]
  };

  return (
    <>
      <ExplanationTemplate {...latexContent} />
      <SearchResultModal 
        formula={selectedFormula} 
        onClose={() => setSelectedFormula(null)} 
      />
    </>
  );
};

export default LaTeX;