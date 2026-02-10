import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Heart, Camera, MapPin, Users, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
}

const steps: OnboardingStep[] = [
  { id: 1, title: 'Welcome to Pulse', subtitle: 'Find your perfect match with our smart algorithm' },
  { id: 2, title: 'Create Your Profile', subtitle: 'Tell us about yourself' },
  { id: 3, title: 'Set Your Preferences', subtitle: 'Who are you looking for?' },
  { id: 4, title: 'Enable Location', subtitle: 'Find matches nearby' },
];

export function OnboardingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'female' as 'male' | 'female' | 'other',
    bio: '',
    interests: [] as string[],
    showMe: 'male' as 'male' | 'female' | 'everyone',
    ageRange: [18, 35] as [number, number],
    maxDistance: 50,
  });

  const availableInterests = [
    'Music', 'Travel', 'Fitness', 'Art', 'Food', 'Gaming',
    'Movies', 'Books', 'Sports', 'Photography', 'Dancing', 'Yoga'
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
    } else {
      setFormData({ ...formData, interests: [...formData.interests, interest] });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return true;
      case 2: return formData.name && formData.age && formData.bio;
      case 3: return formData.interests.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[var(--navy-deep)] relative flex flex-col">
        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="flex gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`h-1 flex-1 rounded-full transition-all ${
                  step.id <= currentStep ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <motion.div
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--magenta)] to-pink-600 rounded-full flex items-center justify-center mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-12 h-12 text-white" fill="white" />
                  </motion.div>
                  <h1 className="text-4xl font-bold text-white mb-3">Welcome to Pulse</h1>
                  <p className="text-white/60 text-lg">{steps[0].subtitle}</p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Sparkles, text: 'Smart matching algorithm' },
                    { icon: Users, text: 'Thousands of active users' },
                    { icon: MapPin, text: 'Find matches nearby' },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <feature.icon className="w-6 h-6 text-[var(--magenta)]" />
                      <span className="text-white">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{steps[1].title}</h2>
                  <p className="text-white/60">{steps[1].subtitle}</p>
                </div>

                {/* Profile Photo */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-white/5 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-3">
                    <Camera className="w-8 h-8 text-white/40" />
                  </div>
                  <button className="text-[var(--magenta)] font-semibold">Add Photo</button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)]"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)]"
                        placeholder="25"
                      />
                    </div>

                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--magenta)]"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)] resize-none"
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{steps[2].title}</h2>
                  <p className="text-white/60">{steps[2].subtitle}</p>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-3 block">I'm interested in</label>
                  <div className="flex gap-3">
                    {['male', 'female', 'everyone'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData({ ...formData, showMe: option as any })}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                          formData.showMe === option
                            ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600 text-white'
                            : 'bg-white/5 text-white/60 border border-white/10'
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-3 block">Age Range: {formData.ageRange[0]} - {formData.ageRange[1]}</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={formData.ageRange[0]}
                      onChange={(e) => setFormData({ ...formData, ageRange: [parseInt(e.target.value), formData.ageRange[1]] })}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={formData.ageRange[1]}
                      onChange={(e) => setFormData({ ...formData, ageRange: [formData.ageRange[0], parseInt(e.target.value)] })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-3 block">Maximum Distance: {formData.maxDistance} km</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={formData.maxDistance}
                    onChange={(e) => setFormData({ ...formData, maxDistance: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-3 block">Your Interests (Select at least 1)</label>
                  <div className="flex flex-wrap gap-2">
                    {availableInterests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600 text-white'
                            : 'bg-white/5 text-white/60 border border-white/10'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <motion.div
                  className="w-32 h-32 mx-auto bg-gradient-to-br from-[var(--electric-blue)] to-blue-600 rounded-full flex items-center justify-center mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-16 h-16 text-white" />
                </motion.div>

                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">{steps[3].title}</h2>
                  <p className="text-white/60 text-lg mb-8">{steps[3].subtitle}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <p className="text-white/80">
                    We use your location to show you matches nearby and calculate distances accurately.
                  </p>
                  <p className="text-white/60 text-sm">
                    Your exact location is never shared with other users. Only distance is shown.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="p-6 space-y-3">
          <motion.button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full py-4 rounded-full font-bold text-white transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600 shadow-lg shadow-pink-500/30'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
            whileTap={canProceed() ? { scale: 0.98 } : {}}
          >
            {currentStep === 4 ? 'Get Started' : 'Continue'}
          </motion.button>

          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="w-full py-4 text-white/60 font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
