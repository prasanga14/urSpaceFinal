import React from 'react';
import Avatar from 'react-avatar';

const RequestComponent = ({ username }) => {
  return (
    <div className="flex m-2">
      <Avatar name={username} size="25" round="14px" className=" ml-2 mr-3" />
      <p>{username}</p>
      <button className="accept">✅</button>
      <button className="reject">❌</button>
    </div>
  );
};

export default RequestComponent;
