import { Grid, Heart, MessageCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';

export function BottomNavigation() {
  const location = useLocation();
  
  const tabs = [
    { path: '/explore', icon: Grid, label: 'Explore' },
    { path: '/swipe', icon: Heart, label: 'Swipe' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/settings', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 px-4">
      {/* Glassmorphism Container */}
      <motion.div
        className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl px-4 py-3"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.3 }}
      >
        <div className="flex items-center gap-4">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full"
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                <motion.div
                  className="relative z-10"
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.4)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'fill-white' : ''}`} />
                </motion.div>
                <motion.span
                  className="relative text-xs font-medium z-10"
                  animate={{
                    color: isActive ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.4)'
                  }}
                >
                  {tab.label}
                </motion.span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
}