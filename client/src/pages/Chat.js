import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Chat() {
  const { userId } = useParams();
  const myId = localStorage.getItem("userId");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch old messages
  useEffect(() => {
    const fetchMessages = async () => {
    try {
      const res = await API.get(`/chat/${userId}`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

    fetchMessages();
  }, [userID]);

  
  // Receive message
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    const msgData = {
      sender: myId,
      receiver: userId,
      message,
    };

    // Save to DB
    await API.post("/chat/send", msgData);

    // Emit to socket
    socket.emit("send_message", msgData);

    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col p-4 text-white">
      <h1 className="text-2xl mb-4">Chat 💬</h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === myId
                ? "bg-green-500 ml-auto"
                : "bg-gray-500"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded bg-white/20 outline-none"
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}