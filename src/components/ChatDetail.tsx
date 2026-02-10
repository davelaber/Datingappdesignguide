import { useState } from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate, useParams } from 'react-router';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

const mockMessages: Message[] = [
  { id: 1, text: 'Hey! How are you?', sender: 'them', timestamp: '2:30 PM' },
  { id: 2, text: "I'm great! Just finished work. You?", sender: 'me', timestamp: '2:32 PM' },
  { id: 3, text: 'Thank you, I love exploring new places!', sender: 'them', timestamp: '2:35 PM' },
  { id: 4, text: 'Would you like to grab coffee sometime?', sender: 'me', timestamp: '2:40 PM' },
  { id: 5, text: "That sounds amazing! I'd love to 😊", sender: 'them', timestamp: '2:42 PM' },
];

export function ChatDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: inputValue,
          sender: 'me',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setInputValue('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--navy-deep)]">
      {/* Header */}
      <motion.div
        className="bg-[var(--navy-card)] border-b border-white/10 px-4 py-3 flex items-center justify-between"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/messages')}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDMzMjczNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Isabel"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--navy-card)]" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Isabel</h3>
              <p className="text-white/50 text-xs">Active now</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.sender === 'me'
                  ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600 text-white'
                  : 'bg-white/10 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className={`text-xs mt-1 block ${message.sender === 'me' ? 'text-white/70' : 'text-white/50'}`}>
                {message.timestamp}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <motion.div
        className="border-t border-white/10 px-4 py-4 bg-[var(--navy-card)]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)] transition-colors"
          />
          <motion.button
            onClick={handleSend}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--magenta)] to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
