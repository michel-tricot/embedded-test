import React from 'react';

function Toast({ message, type, visible }) {
  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}

export default Toast;