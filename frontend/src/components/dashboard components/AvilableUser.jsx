import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import toast from 'react-hot-toast';

const AvailableUser = ({ user }) => {
  const [connect, setConnect] = useState('');
  const [bg, setBg] = useState('secondary');

  useEffect(() => {
    setConnect('connect');
  }, []);

  function handleConnect() {
    if (connect === 'connect') {
      setConnect('Req sent');
      toast.success('Connection request sent');
      setBg('green');
    } else if (connect === 'Req sent') {
      setConnect('connect');
      toast.error('Request cancled');
      setBg('secondary');
    }
  }

  return (
    <div
      className={`client flex items-center justify-center text-2xl ${
        localStorage.getItem('id') === user._id ? 'hidden' : ''
      }`}
    >
      <Avatar
        name={user.username}
        size="25"
        round="14px"
        className=" ml-2 mr-3"
      />
      <span className="text-black ml-1">{user.username}</span>
      <span>
        <button
          onClick={handleConnect}
          className={`text-lg ml-2 bg-${bg}  w-full rounded-lg`}
        >
          {connect}
        </button>
      </span>
    </div>
  );
};

export default AvailableUser;
