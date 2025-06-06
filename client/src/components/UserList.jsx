import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/authContext';
import API from '../utils/api';

const usersDefault = [
  {
    _id: 1,
    name: 'Alice',
    active: true,
    avatar: 'https://i.pravatar.cc/40?img=1',
    unread: 2,
  },
  {
    _id: 2,
    name: 'Bob',
    active: false,
    avatar: 'https://i.pravatar.cc/40?img=2',
    unread: 0,
  },
  {
    _id: 3,
    name: 'Charlie',
    active: true,
    avatar: 'https://i.pravatar.cc/40?img=3',
    unread: 5,
  },
  {
    _id: 4,
    name: 'Daisy',
    active: false,
    avatar: 'https://i.pravatar.cc/40?img=4',
    unread: 1,
  },
];

const UserList = ({ setReceiver, selectedReceiver, activeUsers }) => {
  const [users, setUsers] = useState(usersDefault);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      return await API.get('/users')
        .then((response) => {
          const filteredUsers = response?.data.filter(
            (getUser) => getUser._id !== user._id
          );

          setUsers(filteredUsers);
          // const isActive = filteredUsers.some((user) =>
          //   activeUsers.includes(user._id)
          // );

          // console.log(isActive);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };

    getUsers();
  }, []);

  return (
    <>
      <div className='mb-4'>
        <h2 className='text-xl font-bold mb-2'>Users</h2>
        <ul className='space-y-2'>
          {users.map((user) => (
            <li
              key={user._id}
              className={
                'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-800 transition cursor-pointer relative ' +
                  user._id ===
                selectedReceiver
                  ? 'active'
                  : ''
              }
              onClick={() => setReceiver(user._id)}
            >
              <div className='relative'>
                <img
                  src={user?.avatar}
                  alt={user.username}
                  className='w-10 h-10 rounded-full object-cover'
                />
                {user?.active && (
                  <span className='absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#1f1235] animate-pulse'></span>
                )}
              </div>
              <div className='flex-1'>
                <span>{user.username}</span>
                {user?.unread > 0 && (
                  <span className='ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full'>
                    {user?.unread}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserList;
