import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'

/**
 * ChatWindow Component
 * Displays all messages in a scrollable container
 * Auto-scrolls to latest message
 */
export const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="chat-window">
      {/* Empty state */}
      {messages.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h2>Start a Conversation</h2>
          <p>Type a message below to chat with the AI</p>
        </div>
      )}

      {/* Messages list */}
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  )
}
