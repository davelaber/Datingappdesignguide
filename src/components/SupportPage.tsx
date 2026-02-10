import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, ChevronDown, Send } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I verify my profile?',
    answer: 'To verify your profile, go to Settings > Profile > Verify Profile. Follow the on-screen instructions to take a selfie that matches our verification pose. Verification typically takes 24-48 hours.',
  },
  {
    question: 'How does the matching algorithm work?',
    answer: 'Our algorithm considers your preferences (age, distance, gender), your interests, activity patterns, and mutual connections to suggest the most compatible matches.',
  },
  {
    question: 'Can I undo a swipe?',
    answer: 'Yes! With Pulse Premium, you can undo unlimited swipes. Free users get 3 rewinds per day. Tap the yellow arrow icon on the swipe screen to undo your last action.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'Go to Settings > Billing & Subscriptions > Manage Subscription. From there you can cancel or modify your subscription plan at any time.',
  },
  {
    question: 'Why am I not getting matches?',
    answer: 'Try updating your profile with clear photos and an interesting bio. Also, check your preferences - you might have very restrictive filters. Verified profiles tend to get more matches!',
  },
  {
    question: 'How do I report someone?',
    answer: 'If you see inappropriate behavior, tap the three dots on their profile and select "Report User". Our team reviews all reports within 24 hours.',
  },
  {
    question: 'Is my location shared with matches?',
    answer: 'No, we never share your exact location. Matches only see an approximate distance (e.g., "5 km away"). You can hide your distance in Privacy Settings.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay for iOS users.',
  },
];

export function SupportPage() {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    email: '',
    message: '',
  });

  const handleSubmitContact = () => {
    // Submit contact form logic
    setShowContactForm(false);
    setContactForm({ subject: '', email: '', message: '' });
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
          <h1 className="text-white text-xl font-bold">Help & Support</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Contact Us</h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-[var(--magenta)]" />
              <span className="text-white text-sm font-medium">Chat</span>
            </button>
            <a
              href="mailto:support@pulse.app"
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <Mail className="w-6 h-6 text-[var(--electric-blue)]" />
              <span className="text-white text-sm font-medium">Email</span>
            </a>
            <a
              href="tel:+1234567890"
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <Phone className="w-6 h-6 text-green-500" />
              <span className="text-white text-sm font-medium">Call</span>
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-bold text-lg">Send us a message</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-white/60 hover:text-white text-sm"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block">Subject</label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--magenta)]"
                >
                  <option value="">Select a topic</option>
                  <option value="account">Account Issues</option>
                  <option value="payment">Payment & Billing</option>
                  <option value="technical">Technical Support</option>
                  <option value="safety">Safety & Privacy</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)]"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your issue..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)] resize-none"
                />
              </div>

              <button
                onClick={handleSubmitContact}
                className="w-full py-3 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-xl text-white font-bold shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[var(--magenta)]" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-white/60 flex-shrink-0" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-white/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Additional Resources</h2>
          <div className="space-y-3">
            <a
              href="#"
              className="block bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-white font-medium mb-1">Safety Tips</h3>
              <p className="text-white/60 text-sm">Learn how to stay safe while dating online</p>
            </a>
            <a
              href="#"
              className="block bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-white font-medium mb-1">Community Guidelines</h3>
              <p className="text-white/60 text-sm">Read our community standards and rules</p>
            </a>
            <a
              href="#"
              className="block bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-white font-medium mb-1">Privacy Policy</h3>
              <p className="text-white/60 text-sm">Understand how we protect your data</p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
