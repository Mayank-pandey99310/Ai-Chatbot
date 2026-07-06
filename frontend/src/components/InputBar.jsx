import { useRef, useEffect } from 'react'

/**
 * InputBar Component
 * Handles user message input and sending
 * Supports Enter to send, Shift+Enter for new line
 * Disables during AI response generation
 */
export const InputBar = ({
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
}) => {
  const textareaRef = useRef(null)

  // Auto-expand textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = Math.min(scrollHeight, 120) + 'px'
    }
  }, [inputValue])

  // Handle Enter key - send message (Shift+Enter creates new line)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  const handleSendClick = () => {
    
    onSendMessage()
  }

  // Disable when loading or empty
  const isDisabled = isLoading || inputValue.trim() === ''

  return (
    <div className="input-area">
      <div className="input-wrapper">
        {/* Textarea for message input */}
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          placeholder={
            isLoading
              ? 'Waiting for AI response...'
              : 'Type your message (Shift+Enter for new line)'
          }
          rows="1"
          className="message-input"
        />

        {/* Send button */}
        <button
          onClick={handleSendClick}
          disabled={isDisabled}
          className={`send-button ${isDisabled ? 'disabled' : ''}`}
        >
          {isLoading ? 'Generating...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
