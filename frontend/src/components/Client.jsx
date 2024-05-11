import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ username, color }) => {
  console.log(color);
  return (
    <div className="client font-bold flex items-center ml-2 mr-2">
      <Avatar name={username} size="25" round="14px" />
      <span className="text-white text-sm ml-1">{username}</span>
    </div>
  );
};

export default Client;
