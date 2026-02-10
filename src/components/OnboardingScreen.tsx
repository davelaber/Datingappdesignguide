import { motion } from 'motion/react';
import { Heart, Sparkles, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';

export function OnboardingScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[var(--navy-deep)] flex flex-col items-center justify-between px-6 py-12">
      {/* Logo and Hero */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* App Icon */}
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[var(--magenta)] to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/50">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-8 h-8 text-[var(--electric-blue)]" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-5xl font-bold text-white">LoveMatch</h1>
          <p className="text-white/60 text-lg">Find your perfect match</p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="space-y-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: Heart, text: 'Discover nearby singles', color: 'var(--magenta)' },
            { icon: Sparkles, text: 'Smart matching algorithm', color: 'var(--electric-blue)' },
            { icon: Shield, text: 'Safe & verified profiles', color: 'var(--magenta)' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
              </div>
              <span className="text-white/80">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="w-full space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={() => navigate('/swipe')}
          className="w-full py-4 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-pink-500/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>

        <motion.button
          onClick={() => navigate('/swipe')}
          className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold text-lg"
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          whileTap={{ scale: 0.98 }}
        >
          Sign In
        </motion.button>

        <p className="text-center text-white/40 text-sm mt-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
