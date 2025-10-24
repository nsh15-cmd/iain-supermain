"use client"
import React, { useState } from "react";
import { Send, UserCircle } from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

type Account = {
  id: number;
  name: string;
  lastMessage: string;
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "bot", text: "Hey there! How can I assist you?" },
  ]);

  const [input, setInput] = useState("");
  const [activeAccount, setActiveAccount] = useState<number>(1);

  const accounts: Account[] = [
    { id: 1, name: "Recruiter", lastMessage: "Let’s review your interview." },
    { id: 2, name: "HR - Jolly Bee", lastMessage: "Can we reschedule?" },
    { id: 3, name: "System Bot", lastMessage: "Your report is ready." },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulated bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "bot", text: "Got it! 😊" },
      ]);
    }, 800);
  };

  return (
    <section className="flex h-[650] flex-col md:flex-row gap-4 text-white bg-[#1C1F2E] rounded-xl shadow-lg p-4">
      <h1 className="text-3xl font-bold mb-2 md:hidden">Messages</h1>

      <aside className="w-full md:w-1/3 lg:w-1/4 bg-[#2C2C3E] rounded-2xl p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Accounts</h2>

        <div className="flex flex-col gap-3 overflow-y-auto">
          {accounts.map((account) => (
            <div
              key={account.id}
              onClick={() => setActiveAccount(account.id)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                activeAccount === account.id
                  ? "bg-purple-1"
                  : "hover:bg-[#3C3C4E]"
              }`}
            >
              <UserCircle size={32} />
              <div className="flex flex-col">
                <span className="font-medium">{account.name}</span>
                <span className="text-xs text-gray-300 truncate">
                  {account.lastMessage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Container */}
      <div className="flex flex-col flex-1 bg-[#2C2C3E] rounded-2xl p-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-700 mb-2">
          <h2 className="font-semibold text-lg">
            {accounts.find((a) => a.id === activeAccount)?.name || "Chat"}
          </h2>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-3 border-t border-gray-700 flex items-center gap-2 bg-[#2C2C3E] rounded-b-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-600 bg-[#1E1E2F] text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={handleSend}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Messages;

