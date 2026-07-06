import { useState, useCallback } from 'react'
import { useSocket } from './hooks/useSocket'
import { ChatWindow } from './components/ChatWindow'
import { InputBar } from './components/InputBar'
import './App.css'

/**
 * Main App Component
 * Manages:
 * - Chat message state with user and AI messages
 * - Socket.io connection for single ai-response event
 * - Message sending and receiving
 * - Connection status
 * - Error handling
 * - Typing indicator while waiting for response
 */
function App() {
  // Array of all messages: [{ id, sender: "user"|"ai", text, isTyping: true/false }, ...]
  const [messages, setMessages] = useState([])
  
  // Current input field value
  const [inputValue, setInputValue] = useState('')
  
  // Loading state while waiting for AI response
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle complete AI response (single message, not streaming)
   * Replaces typing indicator with actual response
   */
  const handleResponse = useCallback((responseText) => {
    setIsLoading(false)

    // Replace typing indicator message with actual response
    setMessages((prevMessages) => {
      // Find typing indicator message and replace it
      return prevMessages.map((msg) =>
        msg.sender === 'ai' && msg.isTyping
          ? { ...msg, text: responseText, isTyping: false }
          : msg
      )
    })
  }, [])

  /**
   * Handle errors from backend
   */
  const handleError = useCallback((errorMessage) => {
    setIsLoading(false)

    // Remove typing indicator if exists
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => !(msg.sender === 'ai' && msg.isTyping))
    )

    // Add error message to chat
    const errorMsg = {
      id: `error-${Date.now()}`,
      sender: 'error',
      text: `Error: ${errorMessage}`,
    }
    setMessages((prevMessages) => [...prevMessages, errorMsg])
  }, [])

  // Initialize Socket.io connection
  const { socket, isConnected, isConnecting } = useSocket(
    handleResponse,
    handleError
  )

  /**
   * Send user message to backend via socket
   * Also adds typing indicator for incoming AI response
   */
  const handleSendMessage = () => {
    if (inputValue.trim() === '' || !socket || !isConnected) return

    // Create user message object
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
    }

    // Create typing indicator message
    const typingMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: '',
      isTyping: true,
    }

    // Add both messages to state
    setMessages((prevMessages) => [...prevMessages, userMessage, typingMessage])

    // Emit to backend
    socket.emit('user_message', inputValue)

    // Reset input and set loading state
    setInputValue('')
    setIsLoading(true)
  }

  return (
    <div className="app-container">
      {/* Header with title and connection status */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🤖 AI Chatbot</h1>
          <p className="app-subtitle">Powered by Gemini API</p>
        </div>
        
        {/* Connection Status Badge */}
        <div className={`connection-badge ${isConnected ? 'connected' : ''} ${isConnecting ? 'connecting' : ''}`}>
          <span className="status-dot"></span>
          <span className="status-text">
            {isConnecting ? 'Reconnecting...' : isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </header>

      {/* Main chat area */}
      <main className="app-main">
        <ChatWindow messages={messages} />
      </main>

      {/* Input area */}
      <footer className="app-footer">
        <InputBar
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          isLoading={isLoading || !isConnected}
        />
      </footer>
    </div>
  )
}

export default App
