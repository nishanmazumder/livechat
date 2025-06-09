import { useContext } from 'react';
import AuthContext from '../context/authContext';

const UserDetails = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <aside className='w-80 bg-[#1f1235] p-6 hidden lg:flex flex-col gap-4 overflow-y-auto'>
        <div className='flex flex-col items-center text-center'>
          <img
            src='https://i.pravatar.cc/100?img=1'
            alt='User'
            className='w-24 h-24 rounded-full mb-4'
          />
          <h2 className='text-xl font-bold'>{user?.username}</h2>
          <p className='text-sm text-gray-400'>Full Stack Developer</p>
          <p className='text-sm text-gray-500'>📍 New York, USA</p>
          <button className='btn btn-outline mt-4'>Edit Profile</button>
        </div>
      </aside>
    </>
  );
};

export default UserDetails;
