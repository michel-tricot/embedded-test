import React from 'react';

function UserInfo({ user, onLogout, onConnectData }) {
  return (
    <div className="user-info visible">
      <p>Logged in as: <span>{user}</span></p>
      <button className="connect-btn" onClick={onConnectData}>
        Connect Data
      </button>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserInfo;