import { useEffect } from 'react';
import { useRef } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (userData) => {
  const socket = useRef(null);
  const baseUrl = 'http://localhost:3000';

  useEffect(() => {
    if (userData?.id) {
      socket.current = io(baseUrl, {
        query: {
          userId: userData.id,
        },
      });

      console.log('Front - Socket connected for user:', userData.id);
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        console.log('Front - Socket disconnected.');
      }
    };
  }, [userData]);

  return socket.current;
};
