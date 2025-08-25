import React from 'react';

function ThemeToggle({ theme, onToggle }) {
  return (
    <button 
      className="theme-toggle" 
      title="Toggle theme"
      onClick={onToggle}
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;