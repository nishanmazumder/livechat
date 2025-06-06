import React, { useEffect, useRef } from 'react';

const messages = [
  { id: 1, sender: 'Alice', text: 'Hey there!' },
  { id: 2, sender: 'Me', text: 'Hello Alice!' },
  { id: 3, sender: 'Alice', text: 'What’s brewing today?' },
];

const ChatPanel = ({ messages, onSend }) => {
  const messagesEndRef = useRef(null);
 const [text, setText] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onSend(text);
      setText('');
    };


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <main className='flex-1 flex flex-col overflow-hidden'>
        <div className='flex-1 overflow-y-auto p-6 space-y-4'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xl px-4 py-3 rounded-2xl shadow-md bg-white/10 backdrop-blur-sm w-fit ${
                msg.sender === 'Me'
                  ? 'ml-auto text-right bg-purple-500/30'
                  : 'text-left'
              }`}
            >
              <p className='text-sm text-gray-300 font-medium'>{msg.sender}</p>
              <p className='text-lg text-white'>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='p-4 border-t border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2 sticky bottom-0'>
          <form className='message-input' onSubmit={handleSubmit}>
            <input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='input input-bordered w-full bg-white/10 text-white backdrop-blur-sm placeholder:text-gray-400'
              placeholder='Type a message...'
            />
            <button type='submit' className='btn btn-primary'>
              Send
            </button>
          </form>

          {/* <input
            type='text'
            placeholder='Type a message...'
            className='input input-bordered w-full bg-white/10 text-white backdrop-blur-sm placeholder:text-gray-400'
          />
          <button className='btn btn-primary'>Send</button> */}
        </div>
      </main>
    </>
  );
};

export default ChatPanel;
