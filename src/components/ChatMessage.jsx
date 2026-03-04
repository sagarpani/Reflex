import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/human.png';
import './ChatMessage.css'

export function ChatMessage({ message, sender, time, isTyping }) {
  return (
    <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>

      {/* Robot avatar on left */}
      {sender === 'robot' && (
        <img
          src={RobotProfileImage}
          className="chat-message-profile"
          alt="Bot"
        />
      )}
 
      <div className="chat-message-text">
        {isTyping ? (
          /* Animated typing dots */
          <div className="typing-indicator">
            <span />
            <span />
            <span />
          </div>
        ) : (
          <>
            <p className="message">{message}</p>
            {time && <p className="time">{time}</p>}
          </>
        )}
      </div>

      {/* User avatar on right */}
      {sender === 'user' && (
        <img
          src={UserProfileImage}
          className="chat-message-profile"
          alt="You"
        />
      )}
    </div>
  );
}
