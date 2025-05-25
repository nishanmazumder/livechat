import { useEffect } from 'react';
import { useState } from 'react';
import API from '../utils/api';

const ChatUsers = ({ setUser, selectedUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      return await API.get('/users')
        .then((response) => {
          setUsers(response?.data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };

    getUsers();
  }, []);

  // getting pw from users : ) lol

  return (
    <ul className='chat-users'>
      {users.map((user) => (
        <li
          key={user._id}
          className={user._id === selectedUser ? 'active' : ''}
        >
          <a href='#!' onClick={() => setUser(user._id)}>
            {user.name}
          </a>
          <div></div>
        </li>
      ))}
    </ul>
  );
};

export default ChatUsers;
