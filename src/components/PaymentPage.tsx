import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Plus, Trash2, Check, Lock } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export function PaymentPage() {
  const navigate = useNavigate();
  const [showAddCard, setShowAddCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '26',
      isDefault: false,
    },
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const cardBrands = {
    visa: { name: 'Visa', color: 'from-blue-600 to-blue-800' },
    mastercard: { name: 'Mastercard', color: 'from-red-600 to-orange-600' },
    amex: { name: 'American Express', color: 'from-green-600 to-teal-600' },
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const handleAddCard = () => {
    // Validate and add card logic here
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    });
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
          <h1 className="text-white text-xl font-bold">Payment Methods</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Security Notice */}
        <motion.div
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">Secure Payment</h3>
              <p className="text-white/60 text-sm">
                Your payment information is encrypted and securely stored. We never share your details.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Saved Cards */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Saved Cards</h2>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`bg-gradient-to-br ${cardBrands[method.type].color} rounded-2xl p-5 shadow-lg`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="text-white/80 text-sm font-semibold">
                      {cardBrands[method.type].name}
                    </div>
                    {method.isDefault && (
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                        Default
                      </div>
                    )}
                  </div>
                  
                  <div className="text-white text-xl font-mono mb-4 tracking-wider">
                    •••• •••• •••• {method.last4}
                  </div>
                  
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <span>Expires {method.expiryMonth}/{method.expiryYear}</span>
                    <CreditCard className="w-8 h-8 text-white/60" />
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex gap-2 mt-3">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add New Card */}
        {!showAddCard ? (
          <motion.button
            onClick={() => setShowAddCard(true)}
            className="w-full py-4 bg-white/5 border-2 border-dashed border-white/20 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Plus className="w-5 h-5" />
            Add New Card
          </motion.button>
        ) : (
          <motion.div
            className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Add New Card</h3>
              <button
                onClick={() => setShowAddCard(false)}
                className="text-white/60 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Card Number</label>
              <input
                type="text"
                value={newCard.cardNumber}
                onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)]"
              />
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Cardholder Name</label>
              <input
                type="text"
                value={newCard.cardName}
                onChange={(e) => setNewCard({ ...newCard, cardName: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Month</label>
                <input
                  type="text"
                  value={newCard.expiryMonth}
                  onChange={(e) => setNewCard({ ...newCard, expiryMonth: e.target.value })}
                  placeholder="MM"
                  maxLength={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)]"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Year</label>
                <input
                  type="text"
                  value={newCard.expiryYear}
                  onChange={(e) => setNewCard({ ...newCard, expiryYear: e.target.value })}
                  placeholder="YY"
                  maxLength={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)]"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">CVV</label>
                <input
                  type="text"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                  placeholder="123"
                  maxLength={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)]"
                />
              </div>
            </div>

            <motion.button
              onClick={handleAddCard}
              className="w-full py-3 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-xl text-white font-bold shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              <Check className="w-5 h-5" />
              Add Card
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
