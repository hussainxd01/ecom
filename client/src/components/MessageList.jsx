const MessageList = ({ messages }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Messages</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white shadow-sm rounded-lg p-6 transition-shadow duration-300 ease-in-out hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                {message.name}
              </h3>
              <span className="text-sm text-gray-500">{message.date}</span>
            </div>
            <p className="text-gray-600 mb-2">{message.email}</p>
            <p className="text-gray-700">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
