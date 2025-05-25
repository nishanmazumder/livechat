const MessageList = ({ messages }) => {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  console.log(messages);

  return (
    <div className='message-list'>
      {messages.map((message) => (
        <div
          key={'key_' + new Date(message.time).toISOString()}
          className={`message ${message.userId}`}
        >
          <small>{message.userId}</small> /
          <small>
            {new Date(message.time).toLocaleString('en-US', options)}
          </small>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
