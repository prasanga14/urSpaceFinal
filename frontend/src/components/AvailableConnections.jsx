import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/apiurl';
import AvailableUser from './dashboard components/AvilableUser';

const AvailableConnections = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/user/all-users`);
        setAllUsers(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="profileCard border-8 rounded-xl w-96 h-96 flex flex-col justify-center items-center">
      <p className=" text-2xl font-bold">Available Connections: </p>

      {allUsers.map((user) => (
        <AvailableUser user={user} key={user._id} />
      ))}
    </div>
  );
};

export default AvailableConnections;
