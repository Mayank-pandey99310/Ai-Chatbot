# Backend Implementation Guide

## Quick Start - What Your Backend Needs to Do

Your backend runs on port 3000 and must implement Socket.io with these events:

### 1. Listen for User Messages

```javascript
socket.on('ai-message', async (userMessage) => {
  // userMessage is a string from the user
  console.log('User says:', userMessage);
  
  // Process with your AI (Gemini, OpenAI, etc.)
  // ...
});
```

### 2. Send Complete AI Response

```javascript
// After AI processes the message, send the complete response
socket.emit('ai-response', 'Complete AI response text here');
```

### 3. Handle Errors

```javascript
try {
  // Your AI processing
} catch (error) {
  socket.emit('ai-error', 'Error description');
}
```

---

## Full Backend Example (Node.js)

```javascript
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Handle incoming user message
  socket.on('ai-message', async (userMessage) => {
    try {
      console.log('📩 Message received:', userMessage);

      // Example: Call Gemini API
      const aiResponse = await callGeminiAPI(userMessage);
      
      // Send complete response back
      socket.emit('ai-response', aiResponse);

    } catch (error) {
      console.error('❌ Error:', error);
      socket.emit('ai-error', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

async function callGeminiAPI(userMessage) {
  // Your API call here
  // This should return the complete AI response as a string
  return 'Generated response from your AI';
}

server.listen(3000, () => {
  console.log('🚀 Backend listening on http://localhost:3000');
});
```

---

## Frontend → Backend → Frontend Flow

```
┌─────────────┐
│  FRONTEND   │
│ localhost   │
│   :5173     │
└──────┬──────┘
       │
       │ Sends: socket.emit('ai-message', 'Hello')
       ↓
┌─────────────────────────────────────┐
│  YOUR BACKEND                       │
│  localhost:3000 (Socket.io Server)  │
│                                     │
│  1. Receives 'ai-message' event     │
│  2. Processes with AI API           │
│  3. Gets response                   │
│  4. Emits 'ai-response'             │
└──────┬──────────────────────────────┘
       │
       │ Returns: socket.emit('ai-response', 'AI response text')
       ↓
┌─────────────┐
│  FRONTEND   │
│ Updates UI  │
│ Shows AI    │
│ message     │
└─────────────┘
```

---

## What About Port Forwarding?

If your backend is on a different port, update `.env` in frontend:

```env
VITE_SOCKET_URL=http://localhost:5000  # or your port
```

---

## CORS Requirements

Make sure your Socket.io server allows CORS:

```javascript
const io = new Server(server, {
  cors: {
    origin: '*',  // Or specify: ['http://localhost:5173']
    methods: ['GET', 'POST']
  }
});
```

---

## Using Gemini API (Example)

```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function callGeminiAPI(userMessage) {
  const result = await model.generateContent(userMessage);
  const response = await result.response;
  return response.text();
}
```

---

## Testing with curl (Optional)

You can test Socket.io with:

```bash
# Install npm package
npm install socket.io-client

# Test with Node.js
node -e "
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected');
  socket.emit('ai-message', 'Hello from test');
});

socket.on('ai-response', (msg) => {
  console.log('Response:', msg);
  process.exit(0);
});
"
```

---

## Environment Variables

Create `.env` file in backend:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "CORS error" | Enable CORS in Socket.io config |
| "Cannot connect" | Check port 3000 is available, firewall settings |
| "Empty response" | Ensure API key is valid, API has data to generate |
| "Timeout" | Increase timeout, check API response time |

---

## Next Steps

1. ✅ Set up Socket.io server on port 3000
2. ✅ Add event listener for `'ai-message'`
3. ✅ Integrate your AI API (Gemini, OpenAI, etc.)
4. ✅ Emit `'ai-response'` with complete message
5. ✅ Handle errors with `'ai-error'` event
6. ✅ Test with frontend at http://localhost:5173

Good luck! 🚀
