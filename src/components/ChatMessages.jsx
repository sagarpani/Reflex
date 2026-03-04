import { ChatMessage } from "./ChatMessage";
import { useAutoScroll } from '../hooks/useAutoScroll.jsx';
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll(chatMessages);
  return (
    <div className="chat-messages"
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage) =>
        <ChatMessage
          key={chatMessage.id}
          message={chatMessage.message}
          sender={chatMessage.sender}
          time={chatMessage.time}
        />
      )}
    </div>
  )
}

export default ChatMessages;