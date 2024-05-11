import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import AvailableConnections from '../components/AvailableConnections';
import Connections from '../components/Connections';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigator = useNavigate();

  if (localStorage.getItem('token'))
    return (
      <>
        <Navbar />
        <div className="dashboardContainer flex justify-evenly mt-20">
          <ProfileCard />
          <Connections />
          <AvailableConnections />
        </div>
      </>
    );
  else {
    useEffect(() => {
      navigator('/login');
      toast.error('Login to go to dashboard');
    }, []);
  }
};

export default Dashboard;
