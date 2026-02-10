import { useState } from 'react';
import { Search, Phone, Video, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
  online?: boolean;
}

interface Call {
  id: number;
  name: string;
  avatar: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration?: string;
  timestamp: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Isabel',
    avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDMzMjczNHww&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'Thank you, I love exploring',
    timestamp: 'Yesterday',
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: 'Emma',
    avatar: 'https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzAyMzMxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'That sounds amazing! 😊',
    timestamp: 'Yesterday',
    online: false,
  },
  {
    id: 3,
    name: 'Sophie',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTczODc4NTUzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'See you there!',
    timestamp: '2 days ago',
    online: true,
  },
  {
    id: 4,
    name: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAyNjg4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastMessage: 'Great meeting you!',
    timestamp: '3 days ago',
    online: false,
  },
];

const mockCalls: Call[] = [
  {
    id: 1,
    name: 'Isabel',
    avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDMzMjczNHww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'incoming',
    duration: '12:34',
    timestamp: 'Today, 2:30 PM',
  },
  {
    id: 2,
    name: 'Emma',
    avatar: 'https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzAyMzMxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'outgoing',
    duration: '5:42',
    timestamp: 'Yesterday, 8:15 PM',
  },
  {
    id: 3,
    name: 'Sophie',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTczODc4NTUzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'missed',
    timestamp: 'Yesterday, 3:20 PM',
  },
];

export function MessagesPage() {
  const [activeTab, setActiveTab] = useState<'messages' | 'calls'>('messages');
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--navy-deep)] border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--magenta)] to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">💬</span>
            </div>
            <h1 className="text-white text-2xl font-bold">Chats</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Search className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="relative bg-white/5 rounded-full p-1 flex">
          <motion.div
            className="absolute top-1 bottom-1 bg-[var(--magenta)] rounded-full"
            initial={false}
            animate={{
              left: activeTab === 'messages' ? '4px' : '50%',
              right: activeTab === 'messages' ? '50%' : '4px',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          <button
            onClick={() => setActiveTab('messages')}
            className={`relative z-10 flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'messages' ? 'text-white' : 'text-white/50'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`relative z-10 flex-1 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'calls' ? 'text-white' : 'text-white/50'
            }`}
          >
            Calls
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'messages' ? (
          <motion.div
            key="messages"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="divide-y divide-white/5"
          >
            {mockChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                className="flex items-center gap-3 px-4 py-4 hover:bg-white/5 cursor-pointer active:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/chat/${chat.id}`)}
              >
                {/* Avatar */}
                <div className="relative">
                  <ImageWithFallback
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--navy-deep)]" />
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-semibold">{chat.name}</h3>
                    <span className="text-white/40 text-xs">{chat.timestamp}</span>
                  </div>
                  <p className={`text-sm truncate ${chat.unread ? 'text-white font-medium' : 'text-white/50'}`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {chat.unread && (
                  <div className="w-2 h-2 bg-[var(--magenta)] rounded-full" />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="calls"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="divide-y divide-white/5"
          >
            {mockCalls.map((call, index) => (
              <motion.div
                key={call.id}
                className="flex items-center gap-3 px-4 py-4 hover:bg-white/5 cursor-pointer active:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Avatar */}
                <ImageWithFallback
                  src={call.avatar}
                  alt={call.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                {/* Call Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold mb-1">{call.name}</h3>
                  <div className="flex items-center gap-2">
                    <Phone
                      className={`w-3.5 h-3.5 ${
                        call.type === 'missed'
                          ? 'text-red-400'
                          : call.type === 'incoming'
                          ? 'text-green-400'
                          : 'text-[var(--electric-blue)]'
                      }`}
                    />
                    <span className="text-white/50 text-sm">
                      {call.type === 'missed' ? 'Missed' : call.duration} • {call.timestamp}
                    </span>
                  </div>
                </div>

                {/* Call Again Button */}
                <button className="w-10 h-10 rounded-full bg-[var(--electric-blue)]/20 flex items-center justify-center">
                  <Video className="w-5 h-5 text-[var(--electric-blue)]" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
