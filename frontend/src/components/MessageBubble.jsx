/**
 * MessageBubble Component
 * Displays a single message (user, AI, or error)
 * Shows typing indicator (3 dots) while waiting for AI response
 */
export const MessageBubble = ({ message }) => {
  const isUserMessage = message.sender === 'user'
  const isErrorMessage = message.sender === 'error'
  const isTyping = message.isTyping === true

  return (
    <div className={`message-bubble ${isUserMessage ? 'user-message' : ''} ${isErrorMessage ? 'error-message' : ''}`}>
      <div className="bubble-content">
        {/* Show typing indicator or actual message text */}
        {isTyping ? (
          <div className="typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        ) : (
          <p className="message-text">{message.text}</p>
        )}
      </div>
    </div>
  )
}
