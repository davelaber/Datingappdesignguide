import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Star, Send, ThumbsUp } from 'lucide-react';

export function RatePage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--navy-deep)] flex items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <ThumbsUp className="w-16 h-16 text-white" />
          </motion.div>
          
          <motion.h2
            className="text-3xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Thank You!
          </motion.h2>
          <motion.p
            className="text-white/60 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your feedback helps us improve Pulse
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[var(--navy-deep)]/95 backdrop-blur-sm z-10 px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">Rate Pulse</h1>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Hero */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--magenta)] to-pink-600 rounded-full flex items-center justify-center mb-6"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(236, 72, 153, 0.3)',
                '0 0 40px rgba(236, 72, 153, 0.5)',
                '0 0 20px rgba(236, 72, 153, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-12 h-12 text-white" fill="white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-3">
            Enjoying Pulse?
          </h2>
          <p className="text-white/60 text-lg">
            Your feedback means the world to us!
          </p>
        </motion.div>

        {/* Star Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-bold text-center mb-6">Rate your experience</h3>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star
                  className={`w-12 h-12 transition-all ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-white/20'
                  }`}
                />
                {star <= rating && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Star className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          
          {rating > 0 && (
            <motion.p
              className="text-center text-white/60 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {rating === 5 && "Awesome! We're thrilled! 🎉"}
              {rating === 4 && "Great! Thanks for the love! ❤️"}
              {rating === 3 && "Good! We'll keep improving 👍"}
              {rating === 2 && "Sorry to hear that. We'll do better 💪"}
              {rating === 1 && "We're sorry! Please tell us what went wrong 😔"}
            </motion.p>
          )}
        </motion.div>

        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-bold mb-3">Tell us more (optional)</h3>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What do you love? What could be better?"
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)] resize-none"
          />
        </motion.div>

        {/* Quick Feedback Tags */}
        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-3">Quick feedback</h3>
            <div className="flex flex-wrap gap-2">
              {rating >= 4 ? [
                'Great matches',
                'Easy to use',
                'Love the design',
                'Awesome features',
                'Great value',
                'Quick responses',
              ] : [
                'Too expensive',
                'Not enough matches',
                'Confusing UI',
                'Technical issues',
                'Privacy concerns',
                'Missing features',
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all ${
            rating > 0
              ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600 shadow-lg shadow-pink-500/30'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
          whileTap={rating > 0 ? { scale: 0.98 } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Send className="w-5 h-5" />
          Submit Rating
        </motion.button>

        {/* App Store Link */}
        {rating >= 4 && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/60 text-sm mb-3">
              Love Pulse? Rate us on the App Store!
            </p>
            <a
              href="#"
              className="inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Rate on App Store
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
