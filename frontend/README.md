# 🤖 AI Chatbot Frontend - React + Vite

A modern, responsive React + Vite frontend for AI chatbot applications with real-time Socket.io integration and streaming responses.

## ✨ Features

- **Real-time Streaming** - AI responses appear chunk-by-chunk with typewriter effect
- **Typing Indicator** - Animated 3-dot indicator while AI is generating
- **Connection Status** - Live badge showing Connected/Disconnected/Reconnecting states
- **Dark Theme UI** - Modern, clean, eye-friendly dark interface
- **Fully Responsive** - Mobile, tablet, and desktop optimized
- **Error Handling** - Red error messages with graceful recovery
- **Plain CSS Only** - No CSS frameworks, custom styling with CSS variables
- **Production Ready** - Optimized performance, clean code, well documented

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx      - Messages display area
│   │   ├── MessageBubble.jsx   - Individual message bubble
│   │   └── InputBar.jsx        - Input field + send button
│   ├── hooks/
│   │   └── useSocket.js        - Socket.io connection logic
│   ├── App.jsx                 - Main component with state management
│   ├── App.css                 - Complete styling (dark theme)
│   ├── index.css               - Global styles
│   └── main.jsx                - React entry point
├── .env                        - Environment configuration
├── .env.example                - Environment template
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Update `.env` with your backend URL:

```env
VITE_SOCKET_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will open at `http://localhost:5173`

## 🔌 Backend Integration

Your backend should emit these Socket.io events:

```javascript
// Streaming chunks
socket.emit('ai-response-chunk', 'partial response');

// Response complete
socket.emit('ai-response-done');

// On error
socket.emit('ai-error', 'error message');
```

The frontend listens to these events and updates the chat in real-time.

## 🎨 UI Features

- **Dark Theme** with modern color palette
- **Message Bubbles** - User (purple, right) and AI (gray, left)
- **Typing Indicator** - Animated dots while generating
- **Connection Badge** - Green (connected), Red (disconnected), Amber (reconnecting)
- **Auto-scroll** - Smoothly scrolls to latest message
- **Responsive Layout** - Adapts to mobile, tablet, desktop

## 📱 Responsive Design

- **Desktop** (>768px): Full layout
- **Tablet** (<768px): Compact spacing
- **Mobile** (<480px): Minimal spacing, optimized for touch

## 🛠️ Build Commands

```bash
npm run dev          # Start dev server
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Run ESLint checks
```

## 📦 Tech Stack

- **React 19** - UI library
- **Vite** - Lightning-fast build tool
- **Socket.io Client** - Real-time communication
- **Plain CSS** - Custom styling with CSS variables (no frameworks)

## 🔧 Customization

### Change Colors

Edit `:root` in `App.css`:

```css
--color-primary: #your-blue;
--color-user: #your-purple;
--color-error: #your-red;
```

### Modify Spacing

```css
--spacing-md: 16px;
--spacing-lg: 24px;
```

### Adjust Animations

```css
--transition-fast: 150ms ease-in-out;
```

## 📚 Documentation

- **[Hindi Guide](./GUIDE_HINDI.md)** - Complete guide in Hindi/Hinglish
- **Code Comments** - Every file is thoroughly commented
- Read source files for detailed explanations

## 🐛 Debugging

Open browser DevTools (F12) → Console to see connection status:

```
✅ Connected to AI server
❌ Disconnected from AI server
```

## 📄 License

Open source - feel free to use and modify!

---

For detailed documentation, see [GUIDE_HINDI.md](./GUIDE_HINDI.md)
