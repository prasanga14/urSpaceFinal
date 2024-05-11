import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios, { all } from 'axios';
import toast from 'react-hot-toast';
import ShowRepo from '../components/ShowRepo';

const Github = () => {
  const [githubUsername, setGitubUsername] = useState('');
  const [allRepos, setAllRepos] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (githubUsername === '') toast.error('Username Required');
    setGitubUsername('');

    async function getGithubUser(githubUsername) {
      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${githubUsername}/repos`
        );
        setAllRepos(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getGithubUser(githubUsername);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-2/3 w-2/3 flex-col items-center justify-center">
        <form className=" border-4 rounded-xl p-8 ml-96 mt-9">
          <input
            className=" p-5"
            type="text"
            placeholder="Enter github username"
            value={githubUsername}
            onChange={(e) => setGitubUsername(e.target.value)}
          />
          <button
            className=" w-24 rounded-xl text-white hover:text-white hover:bg-black ml-8 bg-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>

        {allRepos.length === 0 ? (
          <></>
        ) : (
          <div className="showAllRepos flex m-5 justify-center">
            <ShowRepo allRepos={allRepos} />
          </div>
        )}
      </div>
    </>
  );
};

export default Github;
