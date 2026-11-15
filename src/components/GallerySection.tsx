import { useState } from 'react';
import { CLUB_INFO } from '../data/clubData';
import { 
  Image as ImageIcon, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Tag, 
  Download,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Activity
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'matches' | 'trophies' | 'training' | 'fans';
  categoryLabel: string;
  image: string;
  date: string;
  location: string;
  description: string;
  photographer: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-trophy-lift',
    title: 'Continental Championship Glory',
    category: 'trophies',
    categoryLabel: 'Trophies & Glory',
    image: '/src/assets/images/gallery_trophy_lift_1792321239554.jpg',
    date: 'May 24, 2026',
    location: 'St. Simolat Arena, Lagos',
    description: 'Club Captain Marcus Sterling and the squad hoist the Super Champions Trophy amid thousands of cheering fans and a storm of emerald confetti.',
    photographer: 'Simolat Media Desk / T. Adeleke',
  },
  {
    id: 'gal-fans-roar',
    title: 'The Green & White Wall (South Stand)',
    category: 'fans',
    categoryLabel: 'The Lions Faithful',
    image: '/src/assets/images/gallery_fans_arena_1792321290592.jpg',
    date: 'Oct 04, 2026',
    location: 'St. Simolat Arena - Gate 3 South Curve',
    description: 'Over 14,000 passionate Simolat Ultras holding "PRIDE OF GREEN & WHITE" scarves aloft during the pre-match club anthem ceremony.',
    photographer: 'Official Supporters Club Photo Unit',
  },
  {
    id: 'gal-match-dribble',
    title: 'Victor Amadi Electric Flank Attack',
    category: 'matches',
    categoryLabel: 'Matchday Action',
    image: '/src/assets/images/gallery_match_action_1792321258794.jpg',
    date: 'Oct 11, 2026',
    location: 'St. Simolat Arena Pitch',
    description: 'Winger Victor Amadi clocking 35.8 km/h during a rapid 1v1 offensive counter-attack in torrential rain under the St. Simolat floodlights.',
    photographer: 'Sports Lens Africa / F. Mensah',
  },
  {
    id: 'gal-training-science',
    title: 'High-Performance Agility & GPS Speed Trials',
    category: 'training',
    categoryLabel: 'High Performance & Science',
    image: '/src/assets/images/gallery_training_session_1792321273798.jpg',
    date: 'Oct 15, 2026',
    location: 'Simolat Performance Training Center, Victoria Island',
    description: 'First team players undergoing neuromuscular eccentric speed drills and GPS pod telemetry monitoring overseen by Dr. Elena Rossi.',
    photographer: 'Medical & Performance Media',
  },
  {
    id: 'gal-stadium-night',
    title: 'Floodlit Arena Under Continental Skies',
    category: 'fans',
    categoryLabel: 'The Lions Faithful',
    image: '/src/assets/images/hero_stadium_match_1791890599427.jpg',
    date: 'Sept 28, 2026',
    location: 'St. Simolat Arena (48,500 Cap)',
    description: 'Aerial vista of St. Simolat Arena lit by 2,200 lux floodlights as 48,500 roaring supporters pack the stands for the continental derby.',
    photographer: 'Simolat Drone Fleet Operations',
  },
  {
    id: 'gal-star-celebration',
    title: 'Kwame Mensah Goal Euphoria',
    category: 'matches',
    categoryLabel: 'Matchday Action',
    image: '/src/assets/images/star_player_action_1791890600226.jpg',
    date: 'Oct 11, 2026',
    location: 'St. Simolat Arena Penalty Box',
    description: 'Simolat top goalscorer Kwame Mensah roaring in celebration after slotting home an 89th-minute curling match winner.',
    photographer: 'Chief Club Photographer O. Balogun',
  },
  {
    id: 'gal-official-kit',
    title: 'The Green & White Armor: Official Home Kit',
    category: 'trophies',
    categoryLabel: 'Trophies & Glory',
    image: '/src/assets/images/club_kit_home_1791890599264.jpg',
    date: 'Season 2026/27',
    location: 'First Team Dressing Room Sanctuary',
    description: 'The official 2026/27 Simolat Sporting FC Home Kit suspended in the player locker room ahead of kickoff against Zenith Rovers.',
    photographer: 'Kit & Equipment Logistics Staff',
  },
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Media Gallery', icon: ImageIcon },
    { id: 'matches', label: 'Matchday Glory', icon: Sparkles },
    { id: 'trophies', label: 'Trophies & Silverware', icon: Trophy },
    { id: 'training', label: 'Performance & Training', icon: Activity },
    { id: 'fans', label: 'The Lions Faithful', icon: Users },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="py-20 bg-white text-neutral-900 border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (White, Green, and Black) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-600/30 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span>Official Media & Photography Archive</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-black font-heading uppercase tracking-tight">
              Simolat Gallery & Match Vault
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-2xl">
              High-resolution imagery capturing championship euphoria, electric match action, high-performance training ground science, and the passionate Green & White supporters.
            </p>
          </div>

          {/* Media Archive Quick Metrics */}
          <div className="flex items-center gap-3 bg-neutral-900 text-white p-3 rounded-2xl border border-emerald-500/30">
            <div className="px-3 border-r border-neutral-800 text-center">
              <span className="text-xs uppercase font-bold text-neutral-400 block">Season</span>
              <span className="font-heading font-black text-emerald-400 text-lg">2026/27</span>
            </div>
            <div className="px-3 border-r border-neutral-800 text-center">
              <span className="text-xs uppercase font-bold text-neutral-400 block">Quality</span>
              <span className="font-heading font-black text-white text-lg">Ultra 4K</span>
            </div>
            <div className="px-3 text-center">
              <span className="text-xs uppercase font-bold text-neutral-400 block">License</span>
              <span className="font-heading font-black text-emerald-400 text-lg">Official</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-neutral-200">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black text-emerald-400 shadow-md ring-2 ring-emerald-500'
                    : 'bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-neutral-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Photo Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group bg-black rounded-3xl overflow-hidden border-2 border-emerald-500/20 hover:border-emerald-500 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Box */}
              <div className="relative aspect-video overflow-hidden bg-neutral-900">
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Emerald Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top Badge: Category */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 shadow">
                    {photo.categoryLabel}
                  </span>
                </div>

                {/* Quick Zoom Indicator */}
                <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-75 shadow-lg">
                  <ZoomIn className="w-4 h-4 stroke-[2.5]" />
                </div>

                {/* Bottom Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="font-heading font-black text-white text-lg uppercase tracking-wide group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
              </div>

              {/* Photo Metadata Footer (White / Black contrast) */}
              <div className="p-4 bg-neutral-950 text-neutral-300 space-y-2 border-t border-neutral-800">
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>

                <div className="pt-2 border-t border-neutral-850 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{photo.date}</span>
                  </span>
                  <span className="text-emerald-400 font-semibold group-hover:underline">
                    View in Full High-Res →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* High-Resolution Interactive Lightbox Modal */}
      {currentPhoto && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-950 border-2 border-emerald-500/40 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="bg-black p-4 sm:px-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                  Simolat Media Vault · {currentPhoto.categoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Display Area with Nav Arrows */}
            <div className="relative bg-black flex-1 flex items-center justify-center min-h-[350px] sm:min-h-[480px] overflow-hidden group">
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain mx-auto shadow-2xl"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-emerald-500 text-white hover:text-black border border-neutral-700 hover:border-emerald-400 flex items-center justify-center transition-all cursor-pointer shadow-xl"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-emerald-500 text-white hover:text-black border border-neutral-700 hover:border-emerald-400 flex items-center justify-center transition-all cursor-pointer shadow-xl"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Index Indicator */}
              <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 border border-neutral-800">
                {selectedPhotoIndex !== null ? selectedPhotoIndex + 1 : 1} / {filteredPhotos.length}
              </div>
            </div>

            {/* Modal Footer Information Strip */}
            <div className="p-5 sm:p-6 bg-neutral-900 border-t border-neutral-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white font-heading uppercase tracking-wide">
                  {currentPhoto.title}
                </h3>
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentPhoto.location}</span>
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
                {currentPhoto.description}
              </p>

              <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-3">
                <div className="flex items-center gap-4">
                  <span><strong>Date Captured:</strong> {currentPhoto.date}</span>
                  <span><strong>Photographer:</strong> {currentPhoto.photographer}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={currentPhoto.image}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] tracking-wider transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Media</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
