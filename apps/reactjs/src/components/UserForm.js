import React, { useState } from 'react';

function UserForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const success = await onSubmit(email);
    setLoading(false);
    
    if (success) {
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
        <button 
          type="submit" 
          className="action-btn"
          disabled={loading}
        >
          Login or Create
        </button>
        {loading && <div className="spinner visible"></div>}
      </div>
    </form>
  );
}

export default UserForm;