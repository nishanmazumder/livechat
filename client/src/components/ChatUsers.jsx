import { useEffect } from 'react';
import { useState } from 'react';
import API from '../utils/api';
import AuthContext from '../context/authContext';
import { useContext } from 'react';

const ChatUsers = ({ setReceiver, selectedReceiver }) => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      return await API.get('/users')
        .then((response) => {
          const filteredUsers = response?.data.filter(
            (getUser) => getUser._id !== user.id
          );

          setUsers(filteredUsers);
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
          className={user._id === selectedReceiver ? 'active' : ''}
        >
          <a href='#!' onClick={() => setReceiver(user._id)}>
            {user.username}
          </a>
          <div></div>
        </li>
      ))}
    </ul>
  );
};

export default ChatUsers;
