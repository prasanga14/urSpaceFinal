import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Client from '../components/Client';
import EditorComponent from '../components/EditorComponent';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();

  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error ', e);
        toast.error('Socekt connection failed, try again later');
        reactNavigator('/ide');
      }

      socketRef.current.emit('join', {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC__CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // listening for disconnected
      socketRef.current.on('disconnected', ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    // in react useEffect always returns a cleaning function
    return () => {
      // clear all listerner to prevent memory overload
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.disconnect();
    };
  }, []);

  if (!location.state.username) {
    return <Navigate to="/ide" />;
  }

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room Id has been copied to your clipboard');
    } catch (error) {
      toast.error('Could not copy ID');
      console.log(error.message);
    }
  }

  function handleLeave() {
    reactNavigator('/ide');
    toast.success('Room Left');
  }

  return (
    <div className="main flex h-screen relative">
      <div className="aside w-48 bg-gunmetal ">
        <h1 className="logo font-bold text-2xl text-white mx-3 my-2">
          urSpace
        </h1>
        <hr />
        <h3 className=" text-green font-bold my-5 text-center">Connected</h3>
        <div className="clientLists flex items-center flex-wrap gap-5">
          {clients.map((client) => (
            <Client username={client.username} key={client.socketId} />
          ))}
        </div>
      </div>

      <div className=" absolute bottom-0 left-0 p-5 flex flex-col w-40">
        <button
          className="bg-white my-1 rounded font-bold"
          onClick={copyRoomId}
        >
          Copy Room Id
        </button>
        <button
          onClick={handleLeave}
          className="bg-green hover:text-primary text-black my-1 rounded font-bold"
        >
          Leave Meeting
        </button>
      </div>

      <div className="editor w-full bg-editorbg">
        <EditorComponent
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
