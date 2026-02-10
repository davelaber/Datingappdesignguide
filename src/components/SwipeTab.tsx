import { useState } from 'react';
import { Heart, X, Star, MapPin } from 'lucide-react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  distance: string;
  verified: boolean;
  tags: string[];
  photo?: string;
  gender: 'male' | 'female';
  useSilhouette?: boolean;
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'Sarah',
    age: 25,
    location: 'NYC',
    distance: '2 miles away',
    verified: true,
    tags: ['Active', 'Coffee Lover', 'Traveler'],
    photo: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDIxMjQ1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    gender: 'female',
  },
  {
    id: 2,
    name: 'Emma',
    age: 27,
    location: 'Brooklyn',
    distance: '4 miles away',
    verified: true,
    tags: ['Foodie', 'Yoga', 'Art'],
    gender: 'female',
    useSilhouette: true,
  },
  {
    id: 3,
    name: 'Alex',
    age: 29,
    location: 'Manhattan',
    distance: '3 miles away',
    verified: false,
    tags: ['Music', 'Outdoors', 'Tech'],
    photo: 'https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAxODA3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gender: 'male',
  },
  {
    id: 4,
    name: 'Lily',
    age: 24,
    location: 'Queens',
    distance: '5 miles away',
    verified: true,
    tags: ['Dancing', 'Fashion', 'Wine'],
    photo: 'https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzAyMzMxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gender: 'female',
  },
  {
    id: 5,
    name: 'Max',
    age: 31,
    location: 'Brooklyn',
    distance: '3.5 miles away',
    verified: false,
    tags: ['Photography', 'Hiking', 'Coffee'],
    gender: 'male',
    useSilhouette: true,
  },
];

const FemaleSilhouette = () => (
  <svg viewBox="0 0 200 400" className="w-full h-full" fill="currentColor">
    <path d="M100,50 Q80,50 75,70 Q70,90 80,110 Q85,120 90,130 L90,180 L80,180 L70,250 L70,390 L85,390 L85,250 L95,250 L95,390 L105,390 L105,250 L115,250 L115,390 L130,390 L130,250 L120,180 L110,180 L110,130 Q115,120 120,110 Q130,90 125,70 Q120,50 100,50 Z" />
  </svg>
);

const MaleSilhouette = () => (
  <svg viewBox="0 0 200 400" className="w-full h-full" fill="currentColor">
    <path d="M100,50 Q75,50 70,75 Q65,100 75,120 Q80,130 85,140 L70,180 L60,180 L50,250 L50,390 L70,390 L70,250 L80,250 L80,390 L95,390 L95,250 L105,250 L105,390 L120,390 L120,250 L130,250 L130,390 L150,390 L150,250 L140,180 L130,180 L115,140 Q120,130 125,120 Q135,100 130,75 Q125,50 100,50 Z M85,140 L90,180 L110,180 L115,140 Z" />
  </svg>
);

export function SwipeTab() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);

  const currentProfile = profiles[currentIndex];
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleSwipe = (direction: number) => {
    setExitX(direction);
    
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setExitX(0);
      x.set(0);
    }, 300);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      handleSwipe(info.offset.x > 0 ? 1 : -1);
    } else {
      x.set(0);
    }
  };

  if (!currentProfile) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 pb-24">
      {/* Card Stack Container */}
      <div className="relative w-full h-[70vh]">
        {/* Next Card Preview */}
        {profiles[currentIndex + 1] && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 0.95, opacity: 0.5 }}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-[var(--navy-card)]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            </div>
          </motion.div>
        )}

        {/* Current Card */}
        <motion.div
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          style={{ x, rotate, opacity }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={exitX !== 0 ? { x: exitX * 300, opacity: 0 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
            {/* Card Background with Photo or Silhouette */}
            <div className="absolute inset-0 bg-[var(--navy-card)]">
              {currentProfile.useSilhouette ? (
                <div className="absolute inset-0 flex items-center justify-center px-12">
                  <div className={currentProfile.gender === 'female' ? 'text-[var(--magenta)]' : 'text-[var(--electric-blue)]'}>
                    {currentProfile.gender === 'female' ? <FemaleSilhouette /> : <MaleSilhouette />}
                  </div>
                </div>
              ) : currentProfile.photo ? (
                <ImageWithFallback
                  src={currentProfile.photo}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center px-12">
                  <div className={currentProfile.gender === 'female' ? 'text-[var(--magenta)]' : 'text-[var(--electric-blue)]'}>
                    {currentProfile.gender === 'female' ? <FemaleSilhouette /> : <MaleSilhouette />}
                  </div>
                </div>
              )}
              
              {/* Gradient Overlay for Better Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            </div>

            {/* Swipe Indicators */}
            <motion.div
              className="absolute top-1/4 left-8 border-4 border-green-500 rounded-2xl px-6 py-3 rotate-[-20deg]"
              style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
            >
              <span className="text-green-500 text-3xl font-bold">LIKE</span>
            </motion.div>

            <motion.div
              className="absolute top-1/4 right-8 border-4 border-red-500 rounded-2xl px-6 py-3 rotate-[20deg]"
              style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
            >
              <span className="text-red-500 text-3xl font-bold">NOPE</span>
            </motion.div>

            {/* Verified Badge */}
            {currentProfile.verified && (
              <motion.div
                className="absolute top-6 right-6 bg-[var(--magenta)] rounded-full p-2 shadow-lg ring-2 ring-white/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                <Star className="w-5 h-5 text-white fill-white" />
              </motion.div>
            )}

            {/* Profile Info at Bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Name and Age */}
              <div className="flex items-center gap-3">
                <h2 className="text-white text-3xl font-semibold">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{currentProfile.location} • {currentProfile.distance}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentProfile.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs border border-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex items-center justify-center gap-6 mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={() => handleSwipe(-1)}
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Pass"
        >
          <X className="w-8 h-8 text-red-400" />
        </motion.button>
        
        <motion.button
          onClick={() => handleSwipe(1)}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--magenta)] to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Like"
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.button>
        
        <motion.button
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Super Like"
        >
          <Star className="w-8 h-8 text-[var(--electric-blue)]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
