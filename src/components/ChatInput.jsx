import { useState } from 'react';
import dayjs from 'dayjs';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages, clear }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText.trim() === '') return;

    const cleanedInput = inputText.trim().toLowerCase();
    const displayInput = inputText.trim();

    setIsLoading(true);
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: displayInput,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().format('h:mma'),
      },
    ];
    setChatMessages(newChatMessages);

    // Show typing indicator
    setChatMessages([
      ...newChatMessages,
      {
        message: null,
        isTyping: true,
        sender: 'robot',
        id: 'typing-indicator',
      },
    ]);

    const response = await Chatbot.getResponseAsync(cleanedInput);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().format('h:mma'),
      },
    ]);

    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <input
          className="chat-input"
          placeholder="Try me..."
          value={inputText}
          onChange={saveInputText}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
            if (e.key === 'Escape') setInputText('');
          }}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="send-button"
          disabled={isLoading || inputText.trim() === ''}
          title="Send message"
        >
          {/* Paper-plane SVG icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      <div className="chat-input-bottom">
        <button className="clear-btn" onClick={clear}>
          Clear chat
        </button>
      </div>
    </div>
  );
}