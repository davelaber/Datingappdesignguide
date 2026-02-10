import { MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GridProfile {
  id: number;
  name: string;
  age: number;
  distance: string;
  photo?: string;
  verified: boolean;
  gender: 'male' | 'female';
  useSilhouette?: boolean;
}

const mockGridProfiles: GridProfile[] = [
  {
    id: 1,
    name: 'Jessica',
    age: 26,
    distance: '1.2 mi',
    photo: 'https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzAyMzMxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    gender: 'female',
  },
  {
    id: 2,
    name: 'Mia',
    age: 24,
    distance: '2.5 mi',
    verified: false,
    gender: 'female',
    useSilhouette: true,
  },
  {
    id: 3,
    name: 'Ryan',
    age: 28,
    distance: '3.1 mi',
    photo: 'https://images.unsplash.com/photo-1616235931343-10a92ecaeaf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMTkxNzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    gender: 'male',
  },
  {
    id: 4,
    name: 'Sophie',
    age: 25,
    distance: '1.8 mi',
    photo: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDIxMjQ1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    gender: 'female',
  },
  {
    id: 5,
    name: 'David',
    age: 30,
    distance: '4.2 mi',
    verified: false,
    gender: 'male',
    useSilhouette: true,
  },
  {
    id: 6,
    name: 'Emma',
    age: 27,
    distance: '2.9 mi',
    verified: true,
    gender: 'female',
    useSilhouette: true,
  },
  {
    id: 7,
    name: 'James',
    age: 29,
    distance: '5.0 mi',
    photo: 'https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAxODA3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: false,
    gender: 'male',
  },
  {
    id: 8,
    name: 'Olivia',
    age: 23,
    distance: '1.5 mi',
    photo: 'https://images.unsplash.com/photo-1677901766272-8c9d7b49f07c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMjAwMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true,
    gender: 'female',
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

export function ExploreTab() {
  return (
    <div className="h-screen overflow-y-auto pb-20">
      {/* 2-Column Masonry Grid */}
      <div className="grid grid-cols-2 gap-3 p-4 pt-6">
        {mockGridProfiles.map((profile, index) => {
          // Vary heights for masonry effect
          const heightClass = index % 3 === 0 ? 'h-72' : index % 2 === 0 ? 'h-64' : 'h-80';
          
          return (
            <motion.div
              key={profile.id}
              className={`relative ${heightClass} rounded-2xl overflow-hidden bg-[var(--navy-card)] cursor-pointer group`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Profile Image or Silhouette */}
              <div className="absolute inset-0">
                {profile.useSilhouette ? (
                  <div className="w-full h-full flex items-center justify-center px-8">
                    <div className={profile.gender === 'female' ? 'text-[var(--magenta)] opacity-40' : 'text-[var(--electric-blue)] opacity-40'}>
                      {profile.gender === 'female' ? <FemaleSilhouette /> : <MaleSilhouette />}
                    </div>
                  </div>
                ) : profile.photo ? (
                  <ImageWithFallback
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              </div>

              {/* Verified Badge */}
              {profile.verified && (
                <div className="absolute top-2 right-2 bg-[var(--magenta)] rounded-full p-1.5 shadow-lg">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              )}

              {/* Profile Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                <div className="flex items-baseline gap-1">
                  <h3 className="text-white text-base font-semibold">{profile.name}</h3>
                  <span className="text-white/70 text-sm">{profile.age}</span>
                </div>
                <div className="flex items-center gap-1 text-white/60">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">{profile.distance}</span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--magenta)]/0 to-[var(--magenta)]/0 group-hover:from-[var(--magenta)]/20 group-hover:to-transparent transition-all" />
            </motion.div>
          );
        })}
      </div>

      {/* Load More Indicator */}
      <div className="flex justify-center py-8">
        <div className="animate-pulse text-white/40 text-sm">Loading more...</div>
      </div>
    </div>
  );
}