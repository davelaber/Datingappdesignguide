import { motion } from 'motion/react';
import {
  Settings,
  CreditCard,
  Receipt,
  Shield,
  HelpCircle,
  UserPlus,
  Star,
  ChevronRight,
  Crown,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';

interface NavLink {
  icon: any;
  label: string;
  path: string;
}

const navigationLinks: NavLink[] = [
  { icon: Settings, label: 'Preferences', path: '/preferences' },
  { icon: CreditCard, label: 'Payment Methods', path: '/payment' },
  { icon: Receipt, label: 'Billing & Subscriptions', path: '/subscription' },
  { icon: Shield, label: 'Rule & Regulation', path: '/rules' },
  { icon: HelpCircle, label: 'Help & Support', path: '/support' },
  { icon: UserPlus, label: 'Invite Friends', path: '/invite' },
  { icon: Star, label: 'Rate us', path: '/rate' },
];

export function AccountSettings() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto pb-24 bg-[var(--navy-deep)]">
      {/* Header */}
      <motion.div
        className="px-6 pt-8 pb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--magenta)] to-pink-600 rounded-2xl flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold">Account Settings</h1>
        </div>

        {/* Upgrade Premium CTA */}
        <motion.button
          onClick={() => navigate('/subscription')}
          className="w-full bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-3xl p-5 flex items-center gap-4 shadow-xl shadow-pink-500/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-white font-bold text-lg">Upgrade Plan Now</h3>
            <p className="text-white/90 text-sm">Upgrade your free plan to premium to enjoy all the benefits</p>
          </div>
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        className="mx-6 mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={() => navigate('/profile/edit')}
          className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAyNjg4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Allen Walker"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 text-left">
            <h3 className="text-white font-semibold text-lg">Allen Walker</h3>
            <p className="text-white/50 text-sm">allen.walker@gmail.com</p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/40" />
        </button>
      </motion.div>

      {/* Navigation Links */}
      <div className="mx-6 mb-6">
        <h2 className="text-white font-bold text-lg mb-4">Navigation Links</h2>
        <div className="space-y-2">
          {navigationLinks.map((link, index) => (
            <motion.button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <link.icon className="w-5 h-5 text-white/70" />
              <span className="flex-1 text-left text-white font-medium">{link.label}</span>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Log Out Button */}
      <motion.div
        className="mx-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          className="w-full border-2 border-red-500/50 rounded-xl py-4 text-red-400 font-semibold hover:bg-red-500/10 transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          Log Out
        </motion.button>
      </motion.div>
    </div>
  );
}