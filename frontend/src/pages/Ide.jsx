import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { redirect, useNavigate } from 'react-router-dom';

const Ide = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const newRoomIdUUID = uuidV4();

  const handleNewRoom = () => {
    setRoomId(newRoomIdUUID);
    setUsername(localStorage.getItem('username'));
    toast.success('Created a new Room');
  };

  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      joinRoom();
    }
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('Room id & username required');
      return;
    }
    console.log('navigating');

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  {
    if (localStorage.getItem('id'))
      return (
        <>
          <Navbar />
          <div className="rounded-2xl text-primary w-1/2 h-96 flex flex-col justify-center mx-auto border-8  items-center mt-20">
            <h1 className="font-bold text-3xl">Join room from here</h1>
            <input
              type="text"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="m-3 text-black w-96 border-3 border-black p-3 rounded-e"
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="m-2 text-black w-96 border-3 border-black p-3 rounded-e"
              onKeyUp={handleInputEnter}
            />
            <button
              onClick={joinRoom}
              className="button mt-5 bg-primary text-white rounded font-bold p-1 w-32 hover:bg-tartiary hover:text-white"
            >
              Join
            </button>
            <p className=" mt-5">
              If you dont have invite info, create{' '}
              <span
                className="underline cursor-pointer text-secondary"
                onClick={handleNewRoom}
              >
                new room
              </span>
            </p>
          </div>
        </>
      );
    else {
      useEffect(() => {
        toast.error('Please login to continue');
        navigate('/login');
      }, []);
    }
  }
};

export default Ide;
