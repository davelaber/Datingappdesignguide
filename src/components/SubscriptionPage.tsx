import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Crown,
  Check,
  Zap,
  Heart,
  Eye,
  MessageCircle,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  popular?: boolean;
  savings?: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 19.99,
    period: 'month',
    features: ['Unlimited Swipes', 'See Who Likes You', 'Ad-Free Experience', 'Priority Support'],
  },
  {
    id: 'quarterly',
    name: '3 Months',
    price: 44.99,
    period: '3 months',
    popular: true,
    savings: 'Save 25%',
    features: [
      'Unlimited Swipes',
      'See Who Likes You',
      'Ad-Free Experience',
      'Priority Support',
      'Boost Profile Weekly',
    ],
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 99.99,
    period: 'year',
    savings: 'Save 58%',
    features: [
      'Unlimited Swipes',
      'See Who Likes You',
      'Ad-Free Experience',
      'Priority Support',
      'Boost Profile Weekly',
      'Rewind Last Swipe',
      'Travel Mode',
    ],
  },
];

const premiumFeatures = [
  { icon: Heart, text: 'Unlimited Likes', color: 'var(--magenta)' },
  { icon: Eye, text: 'See Who Likes You', color: 'var(--electric-blue)' },
  { icon: Zap, text: 'Boost Your Profile', color: '#FFD700' },
  { icon: MessageCircle, text: 'Send Messages First', color: 'var(--magenta)' },
  { icon: Shield, text: 'Verified Badge', color: 'var(--electric-blue)' },
  { icon: Sparkles, text: 'Priority in Queue', color: '#FFD700' },
];

export function SubscriptionPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('quarterly');

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] overflow-y-auto pb-24">
      {/* Header */}
      <motion.div
        className="sticky top-0 z-10 bg-[var(--navy-deep)] border-b border-white/10 px-4 py-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">Upgrade to Premium</h1>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="px-6 py-8 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--magenta)] to-pink-600 rounded-3xl flex items-center justify-center mb-4 shadow-2xl shadow-pink-500/50"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Crown className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-white text-3xl font-bold mb-2">Unlock Premium Features</h2>
        <p className="text-white/60">Find your perfect match faster with exclusive features</p>
      </motion.div>

      {/* Premium Features Grid */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <div
                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <p className="text-white text-sm font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="px-6 mb-8">
        <h3 className="text-white font-bold text-lg mb-4">Choose Your Plan</h3>
        <div className="space-y-3">
          {plans.map((plan, index) => (
            <motion.button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full rounded-2xl p-5 relative overflow-hidden transition-all ${
                selectedPlan === plan.id
                  ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600 shadow-xl shadow-pink-500/30'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="text-left">
                  <h4 className="text-white font-bold text-xl">{plan.name}</h4>
                  {plan.savings && (
                    <span className={selectedPlan === plan.id ? 'text-white/90' : 'text-[var(--magenta)]'}>
                      {plan.savings}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-white text-2xl font-bold">${plan.price}</div>
                  <div className="text-white/70 text-sm">/{plan.period}</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white" />
                    <span className="text-white/90 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Selection Indicator */}
              {selectedPlan === plan.id && (
                <motion.div
                  className="absolute top-5 right-5 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <Check className="w-4 h-4 text-[var(--magenta)]" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Subscribe Button */}
      <motion.div
        className="px-6 pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="w-full py-5 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-2xl text-white font-bold text-lg shadow-xl shadow-pink-500/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Subscribe Now
        </motion.button>

        <p className="text-center text-white/40 text-xs mt-4">
          Cancel anytime. Terms & conditions apply.
        </p>
      </motion.div>
    </div>
  );
}
