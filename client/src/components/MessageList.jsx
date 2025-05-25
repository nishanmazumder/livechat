const MessageList = ({ messages }) => {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return (
    <div className='message-list'>
      {messages.map((message) => (
        <div key={message._id} className={`message ${message._id}`}>
          <small>{message.userId}</small>
          <small>{message.time.toLocaleString('en-US', options)}</small>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
