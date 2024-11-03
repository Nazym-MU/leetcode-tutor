import React from 'react';

export function Select({ value, onValueChange, children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, setIsOpen, value, onValueChange })
      )}
    </div>
  );
}

export function SelectTrigger({ className = '', children, isOpen, setIsOpen }) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center justify-between w-full px-4 py-2 text-sm border rounded-md bg-white hover:bg-gray-50 ${className}`}
    >
      {children}
      <svg
        className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function SelectValue({ placeholder, value }) {
    const getModeText = (mode) => {
      switch (mode) {
        case 'insert':
          return 'Insert Node';
        case 'delete':
          return 'Delete Node';
        case 'search':
          return 'Search Node';
        default:
          return placeholder;
      }
    };
  
    return <span>{getModeText(value)}</span>;
  }
export function SelectContent({ children, isOpen, value, onValueChange, setIsOpen }) {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
      <ul className="py-1">
        {React.Children.map(children, child =>
          React.cloneElement(child, { onSelect: onValueChange, currentValue: value, setIsOpen })
        )}
      </ul>
    </div>
  );
}

export function SelectItem({ children, value, onSelect, currentValue, setIsOpen }) {
  const handleClick = () => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <li
      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 
        ${currentValue === value ? 'bg-blue-50 text-blue-600' : ''}`}
      onClick={handleClick}
    >
      {children}
    </li>
  );
}