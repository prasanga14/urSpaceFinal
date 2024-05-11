import React, { useState } from 'react';

const ShowRepo = ({ allRepos }) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  function handlePrevious() {
    setCurrentActiveIndex(currentActiveIndex - 1);
  }
  function handleNext() {
    setCurrentActiveIndex(currentActiveIndex + 1);
  }

  return (
    <>
      <button
        className="font-bold text-4xl ml-96 mr-3"
        onClick={handlePrevious}
      >
        ←
      </button>
      <div className="container rounded-lg flex items-center p-2 justify-center  bg-primary text-white h-boxheight w-boxwidth">
        <div>
          <img
            src={allRepos[currentActiveIndex].owner.avatar_url}
            alt=""
            className=" w-12"
          />
          <h1>Owner: {allRepos[currentActiveIndex].owner.login}</h1>
          <p>Repo Name: {allRepos[currentActiveIndex].name}</p>
          <a
            className=" hover:text-secondary"
            href={allRepos[currentActiveIndex].clone_url}
            target="_blank"
          >
            URL: {allRepos[currentActiveIndex].clone_url} <span></span>
          </a>
        </div>
      </div>
      <button className="font-bold text-4xl ml-3" onClick={handleNext}>
        →
      </button>
    </>
  );
};

export default ShowRepo;
