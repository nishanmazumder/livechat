const MessageList = ({ messages }) => {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  // const generateKey = (prefix = 'key') => {
  //   return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  // };

  // messages.map((message) => {
  //   console.log(message.time);
  // });

  return (
    <div className='message-list'>
      {messages.map((message, index) => (
        <div
          key={`message_${index}`}
          className={`message ${message.receiverId}`}
        >
          <small>{message.receiverId}</small> /
          <small>
            {message.time &&
              new Date(message.time).toLocaleString('en-US', options)}
          </small>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
