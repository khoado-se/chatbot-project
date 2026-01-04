import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function clearMessages() {
    localStorage.removeItem("messages");
    setChatMessages([]);
  }

  async function sendMessage() {
    const currentTime = dayjs().format("HH:mm");

    if (isLoading || inputText === "") {
      return;
    }
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        createdAt: currentTime,
      },
    ];

    setChatMessages(newChatMessages);
    const tempInputText = inputText;

    setInputText("");

    setChatMessages([
      ...newChatMessages,
      {
        message: "Loading...",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(tempInputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        createdAt: currentTime,
      },
    ]);
    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            sendMessage();
          } else if (e.key == "Escape") {
            setInputText("");
          }
        }}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
      <button className="clear-button" onClick={clearMessages}>
        Clear
      </button>
    </div>
  );
}
