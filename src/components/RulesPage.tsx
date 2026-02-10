import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, AlertTriangle, Heart, Users, Lock, Eye } from 'lucide-react';

export function RulesPage() {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Heart,
      title: 'Be Respectful',
      color: 'from-pink-500 to-rose-600',
      rules: [
        'Treat others with kindness and respect',
        'No hate speech, discrimination, or harassment',
        'Respect boundaries and consent',
        'Be honest in your profile and interactions',
      ],
    },
    {
      icon: Shield,
      title: 'Stay Safe',
      color: 'from-green-500 to-emerald-600',
      rules: [
        'Never share financial information',
        'Meet in public places for first dates',
        'Tell a friend about your plans',
        'Trust your instincts - report suspicious behavior',
      ],
    },
    {
      icon: Users,
      title: 'Community Guidelines',
      color: 'from-[var(--electric-blue)] to-blue-600',
      rules: [
        'You must be 18+ to use Pulse',
        'One account per person',
        'No spam, scams, or promotional content',
        'Real photos only - no fake profiles',
      ],
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      color: 'from-purple-500 to-violet-600',
      rules: [
        'We never share your personal information',
        'Your location is approximate, not exact',
        'Report and block unwanted contacts',
        'Control who sees your profile',
      ],
    },
  ];

  const prohibitedContent = [
    'Nudity or sexually explicit content',
    'Violence, threats, or self-harm',
    'Illegal activities or substances',
    'Minors in any context',
    'Spam or commercial solicitation',
    'Impersonation or fake profiles',
  ];

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
          <h1 className="text-white text-xl font-bold">Rules & Regulations</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Hero */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--magenta)] to-pink-600 rounded-full flex items-center justify-center mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Shield className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-3">
            Creating a Safe Community
          </h2>
          <p className="text-white/60">
            Our guidelines help everyone have a positive experience on Pulse
          </p>
        </motion.div>

        {/* Main Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg">{section.title}</h3>
              </div>
              
              <ul className="space-y-3">
                {section.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--magenta)] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-white/80">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* Prohibited Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h3 className="text-white font-bold text-lg">Prohibited Content</h3>
            </div>
            
            <p className="text-white/80 mb-4">
              The following is strictly prohibited and will result in immediate account suspension:
            </p>
            
            <ul className="space-y-2">
              {prohibitedContent.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Reporting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-[var(--magenta)]" />
              <h3 className="text-white font-bold text-lg">Report Violations</h3>
            </div>
            
            <p className="text-white/80 mb-4">
              If you see someone breaking these rules, please report them immediately. We review all reports within 24 hours.
            </p>
            
            <div className="bg-white/5 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Report inappropriate content</span>
                <button className="text-[var(--magenta)] font-semibold">Report</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Block a user</span>
                <button className="text-[var(--magenta)] font-semibold">Block</button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consequences */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-white font-bold text-lg mb-4">Consequences of Violations</h3>
          <div className="space-y-3 text-white/80">
            <p>
              <strong className="text-white">First offense:</strong> Warning and temporary restriction
            </p>
            <p>
              <strong className="text-white">Second offense:</strong> 7-day suspension
            </p>
            <p>
              <strong className="text-white">Serious violations:</strong> Immediate permanent ban
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center text-white/60 text-sm space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Last updated: February 5, 2026</p>
          <p>
            By using Pulse, you agree to follow these guidelines and our{' '}
            <button className="text-[var(--magenta)] underline">Terms of Service</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
