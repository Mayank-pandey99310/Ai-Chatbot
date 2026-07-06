AI Chatbot

A full-stack real-time chatbot application powered by Google's Gemini API, built with a React frontend and a Node.js/Express backend communicating over Socket.io.

Features


Real-time messaging via Socket.io (no page refresh, no polling)
AI responses powered by Google Gemini (Interactions API)
Short-term conversation memory using previous_interaction_id — the AI remembers context within a session
Typing indicator while the AI is generating a response
Connection status indicator (Connected / Disconnected / Reconnecting)
Clean, responsive UI built with plain CSS (no CSS framework dependency)


Tech Stack

Frontend


React (Vite)
socket.io-client
Plain CSS


Backend


Node.js
Express
Socket.io
@google/genai (Gemini API SDK)


Project Structure

Ai-Chatbot/
├── backend/
│   ├── src/
│   │   └── services/
│   │       └── ai.service.js     # Gemini API integration
│   ├── server.js                 # Express + Socket.io server
│   ├── package.json
│   └── .env                      # GEMINI_API_KEY (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── hooks/
│   │   │   └── useSocket.js      # Socket connection & event handling
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── InputBar.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── .env                      # VITE_SOCKET_URL (not committed)
│
└── README.md

Getting Started

Prerequisites


Node.js (v18 or higher recommended)
A Google Gemini API key (Google AI Studio)


1. Clone the repository

bashgit clone https://github.com/Mayank-pandey99310/Ai-Chatbot.git
cd Ai-Chatbot

2. Backend setup

bashcd backend
npm install

Create a .env file inside backend/:

GEMINI_API_KEY=your_api_key_here
PORT=3000

Start the backend:

bashnodemon server.js

The server will run on http://localhost:3000.

3. Frontend setup

Open a new terminal:

bashcd frontend
npm install

Create a .env file inside frontend/:

VITE_SOCKET_URL=http://localhost:3000

Start the frontend:

bashnpm run dev

The app will run on http://localhost:5173.

Socket.io Event Contract

EventDirectionPayloadDescriptionai-messageclient → serverstring (user message)Sent when the user submits a messageai_responseserver → clientstring (AI reply text)Sent once the AI has generated a full reply


Note: keep event names identical on both client and server — Socket.io treats ai-response and ai_response as different events.



How Conversation Memory Works

Each socket connection keeps track of the last interaction.id returned by the Gemini API. This id is passed as previous_interaction_id on the next request, so the model retains context of the conversation without the app manually resending full chat history.

This memory is session-scoped and tied to Google's interaction retention window — it is not a substitute for persistent chat history. To keep a permanent record of conversations, messages should additionally be saved to a database.

Environment Variables

VariableLocationDescriptionGEMINI_API_KEYbackendAPI key for Google GeminiPORTbackendPort the Express/Socket.io server runs onVITE_SOCKET_URLfrontendURL of the backend socket server

.env files are excluded from version control via .gitignore — never commit API keys.

License

This project is for personal/educational use.
