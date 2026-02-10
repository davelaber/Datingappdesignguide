import { Heart, Sparkles, X } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[var(--navy-card)] rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--magenta)] to-pink-600 flex items-center justify-center">
              <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--electric-blue)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-white text-2xl font-bold text-center mb-3">
          Oh, you missed some likes
        </h2>

        {/* Subheadline */}
        <p className="text-white/70 text-center mb-8">
          You've used all your free swipes for today. Upgrade to see who likes you and get unlimited swipes.
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--magenta)]" />
            <span className="text-white/80 text-sm">Unlimited swipes every day</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--magenta)]" />
            <span className="text-white/80 text-sm">See who likes you first</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--magenta)]" />
            <span className="text-white/80 text-sm">Access to premium filters</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--magenta)]" />
            <span className="text-white/80 text-sm">Priority profile visibility</span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full py-4 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-full text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-pink-500/50">
          Unlock More Swipes
        </button>

        {/* Pricing */}
        <p className="text-white/50 text-center text-xs mt-4">
          Starting at $9.99/month
        </p>
      </div>
    </div>
  );
}
