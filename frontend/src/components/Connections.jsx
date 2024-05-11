import React from 'react';
import { connections } from '../utils/dummy';
import ConnectionUser from './dashboard components/ConnectionUser';

const Connections = () => {
  return (
    <div className="profileCard border-8 rounded-xl w-96 h-96 flex flex-col justify-center items-center ">
      <h1 className="font-bold text-2xl">Connections</h1>
      {connections.map((connection) => (
        <ConnectionUser
          username={connection.name}
          data={connection}
          key={connection.id}
        />
      ))}
    </div>
  );
};

export default Connections;
