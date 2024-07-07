// components/Chat.js
import React from 'react';

const Chat = ({ selectedUser, onVideoCall }) => {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat with {selectedUser.name}</h2>
      <div className="p-4 border border-gray-300 rounded">
        {/* Your chat interface goes here */}
        <textarea className="w-full h-32 p-2 border border-gray-300 rounded mb-4" placeholder="Type your message..." />
        <button onClick={onVideoCall} className="bg-blue-500 text-white px-4 py-2 rounded">
          Start Video Call
        </button>
      </div>
    </div>
  );
};

export default Chat;
