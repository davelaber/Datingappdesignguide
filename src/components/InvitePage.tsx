import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Gift, Copy, Share2, MessageCircle, Mail, Check } from 'lucide-react';
import { useState } from 'react';

export function InvitePage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const inviteCode = 'PULSE2024';
  const inviteLink = `https://pulse.app/invite/${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on Pulse!',
          text: 'I\'m using Pulse to meet new people. Join me and get a free month of Premium!',
          url: inviteLink,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

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
          <h1 className="text-white text-xl font-bold">Invite Friends</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Hero Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto bg-gradient-to-br from-[var(--magenta)] to-pink-600 rounded-full flex items-center justify-center mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Gift className="w-16 h-16 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-3">
            Give Premium, Get Premium
          </h2>
          <p className="text-white/60 text-lg mb-6">
            Invite your friends and you both get 1 month of Pulse Premium for free!
          </p>

          <div className="bg-gradient-to-r from-[var(--magenta)]/20 to-pink-600/20 border border-[var(--magenta)]/30 rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-1">3</div>
                <div className="text-white/60 text-sm">Friends Invited</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--magenta)] mb-1">2</div>
                <div className="text-white/60 text-sm">Joined</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--electric-blue)] mb-1">2</div>
                <div className="text-white/60 text-sm">Months Free</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Invite Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-white font-bold mb-3">Your Invite Code</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-white/60 text-sm mb-1">Invite Link</div>
                <div className="text-white font-mono text-sm break-all">{inviteLink}</div>
              </div>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-xl flex items-center justify-center"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Share Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-bold mb-3">Share via</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleShare}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-full flex items-center justify-center">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium">Share</span>
            </button>

            <a
              href={`sms:?body=Join me on Pulse! ${inviteLink}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium">Message</span>
            </a>

            <a
              href={`mailto:?subject=Join me on Pulse!&body=I'm using Pulse to meet new people. Join me and get a free month of Premium! ${inviteLink}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[var(--electric-blue)] to-blue-600 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium">Email</span>
            </a>

            <button
              onClick={handleCopy}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                <Copy className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium">Copy Link</span>
            </button>
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-bold mb-4">How it works</h3>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Share your link', desc: 'Send your unique invite link to friends' },
              { step: '2', title: 'They sign up', desc: 'Your friend creates an account using your link' },
              { step: '3', title: 'You both get Premium', desc: 'Both of you receive 1 month of Premium for free!' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Terms */}
        <motion.div
          className="text-center text-white/40 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>Premium rewards are applied after your friend completes registration.</p>
          <p className="mt-1">Maximum 12 months of free Premium per year.</p>
        </motion.div>
      </div>
    </div>
  );
}
