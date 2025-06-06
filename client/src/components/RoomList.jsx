const RoomList = () => {
    return (
      <>
        <div className='mt-2'>
          <h2 className='text-xl font-bold mb-2'>Rooms</h2>
          <ul className='space-y-2'>
            <li className='px-3 py-2 rounded-lg hover:bg-purple-800 transition cursor-pointer'>
              General
            </li>
            <li className='px-3 py-2 rounded-lg hover:bg-purple-800 transition cursor-pointer'>
              Tech
            </li>
            <li className='px-3 py-2 rounded-lg hover:bg-purple-800 transition cursor-pointer'>
              Design
            </li>
          </ul>
        </div>
      </>
    );
}

export default RoomList;
