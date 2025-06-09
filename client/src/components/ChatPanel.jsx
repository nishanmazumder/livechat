import { useEffect, useRef, useState } from 'react';

const options = {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

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
          {messages.map((msg, index) => (
            <div
              key={`message_${index}`}
              className={`max-w-xl px-4 py-3 rounded-2xl shadow-md bg-white/10 backdrop-blur-sm w-fit ${
                0 === index % 2
                  ? 'ml-auto text-right bg-purple-500/30'
                  : 'text-left'
              }`}
            >
              <p className='text-sm text-gray-300 font-medium'>
                {msg.receiverId}
              </p>
              <p className='text-lg text-white'>{msg.message}</p>

              {msg.time && (
                <p className='text-sm text-gray-300 font-small'>
                  {new Date(msg.time).toLocaleString('en-US', options)}
                </p>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='p-4 border-t border-white/10 bg-white/5 backdrop-blur-md items-center gap-2 sticky bottom-0'>
          <form
            className='message-input flex w-full gap-2'
            onSubmit={handleSubmit}
          >
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
        </div>
      </main>
    </>
  );
};

export default ChatPanel;
