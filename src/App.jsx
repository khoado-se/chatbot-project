import { useState } from "react";
import ChatMessages from "./components/ChatMessages";
import { ChatInput } from "./components/ChatInput";
import "./App.css";
import { useEffect } from "react";
import { Chatbot } from "supersimpledev";

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );

  useEffect(() => {
    Chatbot.addResponses({
      "What is your name?": "My name is Dang Khoa",
      "Who are the smartest person?": "Khoa Do",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
