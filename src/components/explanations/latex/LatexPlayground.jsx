import React, { useState, useEffect } from 'react';
import katex from 'katex';
import { Copy, Check } from 'lucide-react';

const LatexPlayground = () => {
  const [input, setInput] = useState('\\frac{1}{2} + \\sqrt{16} = 4');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const rendered = katex.renderToString(input, {
        throwOnError: false,
        displayMode: true
      });
      setOutput(rendered);
    } catch (e) {
      setOutput('Invalid LaTeX syntax');
    }
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 h-96">
        <div className="relative border rounded-lg p-4">
          <textarea
            className="w-full h-full p-2 font-mono resize-none"
            value={input}
            onChange={handleInputChange}
            placeholder="Write your LaTeX here..."
          />
          <button
            onClick={handleCopy}
            className="absolute bottom-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="border rounded-lg p-4 bg-white overflow-auto">
          <div 
            className="h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: output }} 
          />
        </div>
      </div>
    </div>
  );
};

export default LatexPlayground;