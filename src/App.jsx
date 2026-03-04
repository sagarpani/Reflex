import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput.jsx';
import ChatMessages from './components/ChatMessages.jsx';
import { SuggestionsButton } from './components/SuggestionsButton.jsx';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';

import './App.css'

export default function APP() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) ?? []
  );

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    Chatbot.addResponses({
      // Greetings
      "hi": "Hey there! 👋 Great to see you!",
      "hello": "Hello! How can I help you today? 😊",
      "hey": "Hey! What's on your mind?",
      "good morning": "Good morning! ☀️ Ready to build something awesome today?",
      "good night": "Good night! 🌙 Don't forget to commit your code before sleeping.",

      // Casual
      "how are you": "I'm just a bunch of JavaScript, but functioning perfectly! 😄",
      "what's up": "Just chilling in the browser, waiting for your next message.",
      "who are you": "I'm NexBot — your local AI chatbot powered by pure frontend logic. 🤖",
      "tell me a joke": "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",

      // Developer themed
      "react is hard": "React isn't hard. Managing state without losing your mind is. 🧠",
      "javascript is weird": "True. But that's what makes it so powerful! ⚡",
      "explain closure": "A closure is when a function 'closes over' and remembers variables from its parent scope — even after that scope is gone. 🔒",
      "what is state": "State is dynamic data that, when changed, triggers a re-render of your component. 🔄",
      "what is useffect": "useEffect lets you run side effects — like API calls, subscriptions, or DOM updates — after rendering. ✨",

      // Motivation
      "i feel stuck": "Getting stuck means you're learning. Every expert was once a beginner. Keep pushing! 💪",
      "i'm tired": "Take a short break! Even CPUs need cooling. ☕",
      "i want to quit coding": "Every developer feels that sometimes. The ones who don't quit become the best. 🚀",

      // Fun
      "are you real": "As real as your WiFi connection! 📶",
      "do you sleep": "Only when your app crashes. 💤",
      "do you love me": "I love clean, well-commented code more. 💜",

      // Portfolio
      "who made you": "I was crafted by a developer who's leveling up every single day. 🌟",
      "what can you do": "I can respond to your questions, crack jokes, explain code concepts, and keep you motivated! Try the suggestions below. 💡"
    });
  }, []);

  function clear() {
    setChatMessages([]);
  }

  async function handleSuggestionClick(suggestion) {
    const newChatMessages = [
      ...chatMessages,
      {
        message: suggestion,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().format('h:mma')
      }
    ];
    setChatMessages(newChatMessages);

    // Show typing indicator
    const typingId = crypto.randomUUID();
    setChatMessages([
      ...newChatMessages,
      {
        message: null,
        isTyping: true,
        sender: 'robot',
        id: typingId,
      }
    ]);

    const response = await Chatbot.getResponseAsync(suggestion);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().format('h:mma')
      }
    ]);
  }

  return (
    <div className="app-container">
      {/* Header */}
      <div className="chat-header">
        <h2>Reflex</h2>
        {/* Suggestions */}
        <SuggestionsButton onSuggestionClick={handleSuggestionClick} />
      </div>


      {/* Welcome state */}
      {chatMessages.length === 0 && (
        <div className="welcome-banner">
          <h2>Welcome to Reflex !</h2>
          <p>Type something. I'm warming up my circuits.</p>
        </div>
      )}

      {/* Messages */}
      <ChatMessages chatMessages={chatMessages} />



      {/* Input */}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        clear={clear}
      />
    </div>
  );
}