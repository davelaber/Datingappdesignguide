import { motion } from 'motion/react';
import { ArrowLeft, Construction } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function ComingSoon() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const pageTitle = location.pathname
    .split('/')
    .pop()
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Page';

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-24 h-24 mx-auto bg-white/10 rounded-3xl flex items-center justify-center mb-6"
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
          <Construction className="w-12 h-12 text-white/60" />
        </motion.div>
        
        <h1 className="text-white text-3xl font-bold mb-3">Coming Soon</h1>
        <p className="text-white/60 mb-8">
          The {pageTitle} feature is currently under development
        </p>

        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-full text-white font-semibold shadow-lg shadow-pink-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
}
