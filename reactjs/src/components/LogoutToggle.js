import React from 'react';

function LogoutToggle({ onLogout }) {
  return (
    <button 
      className="logout-toggle" 
      title="Logout"
      onClick={onLogout}
    >
      🚪
    </button>
  );
}

export default LogoutToggle;