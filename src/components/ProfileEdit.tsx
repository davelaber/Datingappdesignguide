import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Plus, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';

export function ProfileEdit() {
  const navigate = useNavigate();
  const [name, setName] = useState('Allen Walker');
  const [age, setAge] = useState('28');
  const [bio, setBio] = useState('Adventure seeker | Coffee enthusiast | Dog lover');
  const [interests, setInterests] = useState(['Travel', 'Photography', 'Fitness', 'Music']);
  const [newInterest, setNewInterest] = useState('');

  const handleAddInterest = () => {
    if (newInterest.trim() && interests.length < 8) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] overflow-y-auto pb-24">
      {/* Header */}
      <motion.div
        className="sticky top-0 z-10 bg-[var(--navy-deep)] border-b border-white/10 px-4 py-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">Edit Profile</h1>
          <button className="text-[var(--magenta)] font-semibold">Save</button>
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Profile Photos</h2>
          <div className="grid grid-cols-3 gap-3">
            {/* Main Photo */}
            <div className="col-span-2 row-span-2 relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAyNjg4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Main photo"
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-[var(--magenta)] rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Additional Photo Slots */}
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className="aspect-square rounded-xl bg-white/5 border border-white/10 border-dashed flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Plus className="w-6 h-6 text-white/40" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-white/70 text-sm mb-2 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--magenta)] transition-colors"
              />
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--magenta)] transition-colors"
              />
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--magenta)] transition-colors resize-none"
              />
              <p className="text-white/40 text-xs mt-2">{bio.length}/150 characters</p>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-[var(--magenta)] to-pink-600 rounded-full flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <span className="text-white text-sm font-medium">{interest}</span>
                <button
                  onClick={() => handleRemoveInterest(index)}
                  className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </motion.div>
            ))}
          </div>

          {interests.length < 8 && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                placeholder="Add an interest..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--magenta)] transition-colors"
              />
              <button
                onClick={handleAddInterest}
                className="px-6 py-3 bg-[var(--magenta)] rounded-xl text-white font-semibold hover:bg-pink-600 transition-colors"
              >
                Add
              </button>
            </div>
          )}
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-white font-bold text-lg mb-4">Dating Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="text-white/70 text-sm mb-2 block">Show me</label>
              <div className="flex gap-2">
                {['Women', 'Men', 'Everyone'].map((option) => (
                  <button
                    key={option}
                    className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Age Range: 18 - 35</label>
              <input
                type="range"
                min="18"
                max="60"
                className="w-full"
              />
            </div>

            <div>
              <label className="text-white/70 text-sm mb-2 block">Maximum Distance: 50 km</label>
              <input
                type="range"
                min="1"
                max="100"
                className="w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
