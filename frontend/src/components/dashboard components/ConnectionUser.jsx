import React from 'react';
import Avatar from 'react-avatar';

const ConnectionUser = ({ username, data }) => {
  return (
    <div className={`client flex items-center justify-center mt-2 text-2xl`}>
      <Avatar name={username} size="25" round="14px" className=" ml-2 mr-3" />
      <span className="text-black ml-1">{username}: </span>
      <span className="ml-4 text-secondary font-bold">{data.status}</span>
    </div>
  );
};

export default ConnectionUser;
