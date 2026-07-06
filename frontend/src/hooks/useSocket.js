import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

/**
 * Custom hook to manage Socket.io connection and events
 * Handles connection, disconnection, and listening to AI response events
 * 
 * onResponse: callback when complete AI response arrives
 * onError: callback when an error occurs
 */
export const useSocket = (onResponse, onError) => {
  const socketRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)

  useEffect(() => {
    // Get socket URL from environment variable, default to localhost:3000
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'

    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    // Handle successful connection
    socketRef.current.on('connect', () => {
      console.log('✅ Connected to AI server')
      setIsConnected(true)
      setIsConnecting(false)
    })

    // Handle disconnection
    socketRef.current.on('disconnect', () => {
      console.log('❌ Disconnected from AI server')
      setIsConnected(false)
      setIsConnecting(true)
    })

    // Handle connection error
    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error)
      setIsConnecting(true)
    })

    // Listen for complete AI response (single message, not streaming)
    if (onResponse) {
      socketRef.current.on('ai-response', (responseText) => {
        onResponse(responseText)
      })
    }

    // Listen for errors
    if (onError) {
      socketRef.current.on('ai-error', (errorMessage) => {
        onError(errorMessage)
      })
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [onResponse, onError])

  return {
    socket: socketRef.current,
    isConnected,
    isConnecting,
  }
}
