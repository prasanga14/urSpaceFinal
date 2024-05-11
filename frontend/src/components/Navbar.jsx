import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/apiurl';
import RequestComponent from './dashboard components/RequestComponent';

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [currentStateLandingPage, setCurrentStateLandingPage] = useState('');
  const [notiCount, setNotiCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);

  const friendRequests = [
    {
      id: '1',
      name: 'Ram Thapa',
      profilePicture:
        'https://res.cloudinary.com/dvfeybrvk/image/upload/v1682258754/download_pdurif.png',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Shyam Lama',
      profilePicture:
        'https://res.cloudinary.com/dvfeybrvk/image/upload/v1682258754/download_pdurif.png',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Sita Sharma',
      profilePicture:
        'https://res.cloudinary.com/dvfeybrvk/image/upload/v1682258754/download_pdurif.png',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Gita Sapkota',
      profilePicture:
        'https://res.cloudinary.com/dvfeybrvk/image/upload/v1682258754/download_pdurif.png',
      status: 'Active',
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  useEffect(() => {
    currentPath === '/dashboard' ? setIsDashboard(true) : setIsDashboard(false);
  }, []);

  let showButtons = localStorage.getItem('id') ? false : true;

  useEffect(() => {
    localStorage.getItem('id')
      ? setCurrentStateLandingPage('Dashboard')
      : setCurrentStateLandingPage('Home');
  }, [localStorage.getItem('id')]);

  const handleLogin = () => {
    if (localStorage.getItem('id')) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  function handleNotification() {
    setOpen(() => setOpen(!open));
  }

  // set initial notification count
  useEffect(() => {
    setNotiCount(friendRequests.length);
  }, []);

  const loggedUserId = localStorage.getItem('id');

  useEffect(() => {
    try {
      if (loggedUserId === null) return;
      const getLoggedUser = async () => {
        const { data } = await axios.get(
          `${BASE_URL}/api/user/${loggedUserId}`
        );
        const requiredData = { ...data.requiredUser };
        setLoggedUser(requiredData);
      };
      getLoggedUser();
    } catch (error) {
      console.log(error.message);
    }
  }, [loggedUserId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <nav className="flex text-primary h-20 items-center">
        <a href="/" className="logo font-bold text-2xl mx-2 cursor-pointer">
          urSpace
        </a>
        <ul className="flex mx-12 justify-center items-center">
          <li className="mx-5 hover:underline">
            <a href={currentStateLandingPage === 'Home' ? '/' : '/dashboard'}>
              {currentStateLandingPage}
            </a>
          </li>
          <li className="mx-5 hover:underline">
            <a href="/meeting-room">Create Room</a>
          </li>
          <li className="mx-5 hover:underline">
            <a href="/github">Github</a>
          </li>
          <li className="mx-5 hover:underline">
            <a href="/ide">IDE</a>
          </li>
          {showButtons ? (
            <div className="buttons fixed top-0 right-0 flex items-center justify-center p-4">
              <button
                className="mx-3 bg-primary  text-white py-2 px-4 rounded"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="mx-3 bg-primary  text-white  py-2 px-4 rounded"
                onClick={handleRegister}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="buttons fixed top-0 right-0 flex items-center justify-center p-4">
              <>
                {isDashboard && (
                  <button
                    className=" mr-48 text-2xl"
                    onClick={handleNotification}
                  >
                    🔔
                    <span
                      className={`${
                        notiCount === 0 ? 'text-black' : 'text-red-600'
                      }`}
                    >
                      {notiCount === 0 ? notiCount : `+${notiCount}`}
                    </span>
                  </button>
                )}

                <img
                  className="w-11 px-1 rounded"
                  src={loggedUser.profilePicture}
                  alt="userImage"
                />
                <button>{loggedUser.username}</button>
              </>
              <div className="px-5 cursor-pointer" onClick={handleLogout}>
                logout
              </div>
            </div>
          )}
        </ul>
      </nav>
      <div className="requestSection bg-primary text-white rounded-2xl absolute left-2/4 ml-56  w-52 top-0 mt-14">
        {open &&
          friendRequests.map((friend) => (
            <RequestComponent username={friend.name} key={friend.id} />
          ))}
      </div>
    </>
  );
};

export default Navbar;
