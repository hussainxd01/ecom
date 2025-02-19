import React from "react";
import { useShop } from "../context/ShopContext";

const MessageList = () => {
  const { messages } = useShop();
  console.log(messages);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Messages</h2>
      <div className="space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="bg-white shadow-sm rounded-lg p-6">
              <h3>{message.name}</h3>
              <p>{message.email}</p>
              <p>{message.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default MessageList;
