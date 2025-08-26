import React, { useState } from 'react';

function PasswordForm({ onSubmit }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    const success = await onSubmit(password);
    setLoading(false);
    
    if (success) {
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter access password"
          required
        />
        <button 
          type="submit" 
          className="action-btn"
          disabled={loading}
        >
          Access Demo
        </button>
        {loading && <div className="spinner visible"></div>}
      </div>
    </form>
  );
}

export default PasswordForm;