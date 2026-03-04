import { useState } from 'react';
import './SuggestionsButton.css';
import lightbulb from '../assets/lightbulb.svg';
const SUGGESTIONS = [
  "hi",
  "hello",
  "hey",
  "good morning",
  "good night",
  "how are you",
  "what's up",
  "who are you",
  "tell me a joke",
  "react is hard",
  "javascript is weird",
  "explain closure",
  "what is state",
  "what is useffect",
  "i feel stuck",
  "i'm tired",
  "i want to quit coding",
  "are you real",
  "do you sleep",
  "do you love me",
  "who made you",
  "what can you do"
];

export function SuggestionsButton({ onSuggestionClick }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="suggestions-container">
      <button 
        className="suggestions-button"
        onClick={() => setShowSuggestions(!showSuggestions)}
      >
        <img src={lightbulb} alt="suggestion button" />
      </button>
      
      {showSuggestions && (
        <div className="suggestions-dropdown">
          <div className="suggestions-header">
            <h3>Try these suggestions</h3>
            <button 
              className="close-btn"
              onClick={() => setShowSuggestions(false)}
            >
              ✕
            </button>
          </div>
          <div className="suggestions-list">
            {SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
