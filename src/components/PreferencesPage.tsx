import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Globe, Eye, EyeOff, MapPin, Users } from 'lucide-react';

export function PreferencesPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    showMe: 'male' as 'male' | 'female' | 'everyone',
    ageRange: [18, 35] as [number, number],
    maxDistance: 50,
    discoverable: true,
    showDistance: true,
    showAge: true,
    onlineOnly: false,
    verifiedOnly: false,
  });

  const handleSave = () => {
    // Save preferences logic here
    navigate(-1);
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
          <h1 className="text-white text-xl font-bold">Preferences</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Discovery Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[var(--magenta)]" />
            Discovery Settings
          </h2>
          
          <div className="space-y-4">
            {/* Show Me */}
            <div>
              <label className="text-white/70 text-sm mb-3 block">Show me</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'male', label: 'Men', color: 'var(--electric-blue)' },
                  { value: 'female', label: 'Women', color: 'var(--magenta)' },
                  { value: 'everyone', label: 'Everyone', color: 'purple' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPreferences({ ...preferences, showMe: option.value as any })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      preferences.showMe === option.value
                        ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600 text-white'
                        : 'bg-white/5 text-white/60 border border-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-medium">Age Range</label>
                <span className="text-[var(--magenta)] font-bold">
                  {preferences.ageRange[0]} - {preferences.ageRange[1]}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span>Min: {preferences.ageRange[0]}</span>
                    <span>18 - 80</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={preferences.ageRange[0]}
                    onChange={(e) => setPreferences({ 
                      ...preferences, 
                      ageRange: [parseInt(e.target.value), Math.max(parseInt(e.target.value) + 1, preferences.ageRange[1])] 
                    })}
                    className="w-full accent-[var(--magenta)]"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span>Max: {preferences.ageRange[1]}</span>
                    <span>18 - 80</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={preferences.ageRange[1]}
                    onChange={(e) => setPreferences({ 
                      ...preferences, 
                      ageRange: [preferences.ageRange[0], Math.max(parseInt(e.target.value), preferences.ageRange[0] + 1)] 
                    })}
                    className="w-full accent-[var(--magenta)]"
                  />
                </div>
              </div>
            </div>

            {/* Maximum Distance */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Maximum Distance
                </label>
                <span className="text-[var(--magenta)] font-bold">{preferences.maxDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={preferences.maxDistance}
                onChange={(e) => setPreferences({ ...preferences, maxDistance: parseInt(e.target.value) })}
                className="w-full accent-[var(--magenta)]"
              />
              <div className="flex justify-between text-xs text-white/50 mt-2">
                <span>1 km</span>
                <span>100 km</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-[var(--magenta)]" />
            Privacy Settings
          </h2>
          
          <div className="space-y-3">
            {[
              {
                key: 'discoverable',
                label: 'Make me discoverable',
                description: 'Turn off to pause your profile from being shown to others',
                icon: Globe
              },
              {
                key: 'showDistance',
                label: 'Show my distance',
                description: 'Display your distance to other users',
                icon: MapPin
              },
              {
                key: 'showAge',
                label: 'Show my age',
                description: 'Display your age on your profile',
                icon: Users
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className="bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <setting.icon className="w-4 h-4 text-white/60" />
                      <h3 className="text-white font-medium">{setting.label}</h3>
                    </div>
                    <p className="text-white/50 text-sm">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => setPreferences({ 
                      ...preferences, 
                      [setting.key]: !preferences[setting.key as keyof typeof preferences] 
                    })}
                    className={`ml-4 w-12 h-7 rounded-full transition-all flex items-center ${
                      preferences[setting.key as keyof typeof preferences]
                        ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600'
                        : 'bg-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      preferences[setting.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Advanced Filters</h2>
          
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium mb-1">Only show online users</h3>
                  <p className="text-white/50 text-sm">Filter to users who are currently active</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, onlineOnly: !preferences.onlineOnly })}
                  className={`ml-4 w-12 h-7 rounded-full transition-all flex items-center ${
                    preferences.onlineOnly
                      ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600'
                      : 'bg-white/10'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.onlineOnly ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium mb-1">Verified profiles only</h3>
                  <p className="text-white/50 text-sm">Only show profiles with verified badges</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, verifiedOnly: !preferences.verifiedOnly })}
                  className={`ml-4 w-12 h-7 rounded-full transition-all flex items-center ${
                    preferences.verifiedOnly
                      ? 'bg-gradient-to-r from-[var(--magenta)] to-pink-600'
                      : 'bg-white/10'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.verifiedOnly ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          className="w-full py-4 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-full text-white font-bold shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Check className="w-5 h-5" />
          Save Preferences
        </motion.button>
      </div>
    </div>
  );
}
