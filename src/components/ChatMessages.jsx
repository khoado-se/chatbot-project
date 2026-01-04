import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import "./ChatMessages.css";

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div ref={chatMessagesRef} className="chat-messages-container">
      {chatMessages.length === 0 ? (
        <div className="welcome-text">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </div>
      ) : (
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              key={chatMessage.id}
              message={chatMessage.message}
              sender={chatMessage.sender}
              createdAt={chatMessage.createdAt}
            />
          );
        })
      )}
    </div>
  );
}

export default ChatMessages;
