import React from 'react';

export function Card({ className = '', ...props }) {
  return (
    <div
      className={`bg-white border rounded-lg shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = '', ...props }) {
  return (
    <div 
      className={`p-6 ${className}`} 
      {...props}
    />
  );
}

export function CardTitle({ className = '', children, ...props }) {
  if (!children) return null;
  return (
    <h3
      className={`text-2xl font-semibold ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className = '', ...props }) {
  return (
    <div 
      className={`p-6 pt-0 ${className}`} 
      {...props}
    />
  );
}