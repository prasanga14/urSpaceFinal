import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/apiurl';

const ProfileCard = () => {
  const [loggedUser, setLoggedUser] = useState('');

  const currentUserId = localStorage.getItem('id');

  useEffect(() => {
    if (!currentUserId) return;
    try {
      const getLoggedUser = async (id) => {
        const { data } = await axios.get(`${BASE_URL}/api/user/${id}`);
        setLoggedUser(data.requiredUser);
      };
      getLoggedUser(currentUserId);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="profileCard border-8 rounded-xl w-96 h-96 flex flex-col justify-center items-center text-2xl">
      <img
        src={loggedUser.profilePicture}
        alt="userProfile"
        className=" w-20"
      />
      <h1 className="font-bold">
        Welcome! <span className=" text-secondary">{loggedUser.username}</span>
      </h1>
      <p className="text-lg font-bold">
        Status: <span className="font-bold text-secondary">Active</span>
      </p>
    </div>
  );
};

export default ProfileCard;
