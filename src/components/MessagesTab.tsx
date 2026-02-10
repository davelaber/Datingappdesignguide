import { Heart, MessageCircle } from 'lucide-react';

export function MessagesTab() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-8 pb-20">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--magenta)] to-[var(--electric-blue)] flex items-center justify-center mb-6 opacity-20">
        <MessageCircle className="w-12 h-12 text-white" />
      </div>
      
      <h2 className="text-white text-2xl font-semibold text-center mb-3">
        No Messages Yet
      </h2>
      
      <p className="text-white/60 text-center max-w-xs">
        Start swiping to match with people and begin conversations!
      </p>
    </div>
  );
}