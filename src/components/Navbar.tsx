import { useState } from 'react';
import { CLUB_INFO } from '../data/clubData';
import { soundEffects } from '../utils/audioEffects';
import { 
  Trophy, 
  ShoppingBag, 
  Ticket, 
  Users, 
  Calendar, 
  Shield, 
  Menu, 
  X, 
  Volume2,
  Sparkles,
  Activity,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openTicketModal: () => void;
}

export function Navbar({ activeTab, setActiveTab, cartCount, openCart, openTicketModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);

  const handleSoundEffect = (type: 'horn' | 'whistle') => {
    setSoundPlaying(true);
    if (type === 'horn') soundEffects.playHorn();
    if (type === 'whistle') soundEffects.playWhistle();
    setTimeout(() => setSoundPlaying(false), 1000);
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'performance', label: 'Performance Hub', icon: Activity, isSpecial: true },
    { id: 'matches', label: 'Fixtures & Table', icon: Calendar },
    { id: 'squad', label: 'First Team', icon: Users },
    { id: 'tactics', label: 'Tactics & Pitch', icon: Sparkles },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'tickets', label: 'Tickets', icon: Ticket, action: openTicketModal },
    { id: 'store', label: 'Club Store', icon: ShoppingBag },
    { id: 'honors', label: 'Trophy Room', icon: Trophy },
    { id: 'fanzone', label: 'Fan Zone', icon: Users },
    { id: 'contact', label: 'Contact Us', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/95 text-white border-b border-emerald-500/25 shadow-2xl">
      {/* Top Matchday Alert Ribbon */}
      <div className="bg-gradient-to-r from-neutral-950 via-emerald-950 to-black border-b border-emerald-900/60 text-xs py-1.5 px-4 text-neutral-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">Next Clash:</span>
            <span className="text-white font-medium">Simolat Sporting FC vs Zenith Rovers</span>
            <span className="hidden sm:inline text-neutral-500">·</span>
            <span className="hidden sm:inline text-neutral-300">Sat Oct 18, 17:30 UTC</span>
            <span className="hidden md:inline text-neutral-500">·</span>
            <span className="hidden md:inline text-emerald-400">St. Simolat Arena</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Audio atmosphere trigger */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSoundEffect('horn')}
                title="Sound Stadium Horn"
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-900/80 hover:bg-emerald-800 text-white transition-all border border-emerald-600/50 cursor-pointer ${
                  soundPlaying ? 'scale-105 ring-1 ring-emerald-400' : ''
                }`}
              >
                <Volume2 className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">Stadium Horn</span>
              </button>
              <button
                onClick={() => handleSoundEffect('whistle')}
                title="Referee Whistle"
                className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-all border border-neutral-700 cursor-pointer"
              >
                <span>Whistle</span>
              </button>
            </div>
            
            <button
              onClick={() => { setActiveTab('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-white hover:text-emerald-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ImageIcon className="w-3 h-3 text-emerald-400" />
              <span>Media Vault</span>
            </button>

            <button
              onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-white hover:text-emerald-400 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>Contact Desk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none shrink-0"
          >
            <div className="relative">
              <div className="w-13 h-13 rounded-full bg-black border-2 border-emerald-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300 overflow-hidden flex items-center justify-center">
                <img 
                  src={CLUB_INFO.crestImage} 
                  alt="Simolat Sporting FC Crest"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black text-[9px] font-black px-1.5 rounded shadow">
                1994
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-heading group-hover:text-emerald-400 transition-colors">
                  SIMOLAT
                </span>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-400 uppercase font-heading">
                  SPORTING FC
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
                Official Football Club · The Lions
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              const isSpecial = (item as { isSpecial?: boolean }).isSpecial;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-xs font-bold tracking-wide transition-all duration-200 relative cursor-pointer ${
                    isSpecial
                      ? isActive
                        ? 'bg-emerald-500 text-black rounded-lg shadow-md font-black'
                        : 'text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 rounded-lg hover:bg-emerald-900 font-black'
                      : isActive
                      ? 'text-emerald-400'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {isSpecial && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    <span>{item.label}</span>
                  </span>
                  {isActive && !isSpecial && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Store Cart & Tickets */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('performance')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'performance'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-black'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Performance</span>
            </button>

            <button
              onClick={openTicketModal}
              className="hidden xl:inline-flex items-center gap-1.5 bg-white hover:bg-neutral-100 text-black px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tickets</span>
            </button>

            <button
              onClick={openCart}
              className="relative p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveTab(item.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                setActiveTab('gallery');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white border border-emerald-500/40 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider"
            >
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Media Gallery</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white border border-emerald-500/40 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Contact Us</span>
            </button>
            <button
              onClick={() => {
                openTicketModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-black py-3 rounded-lg font-black text-sm uppercase tracking-wider"
            >
              <Ticket className="w-4 h-4" />
              <span>Reserve Matchday Tickets</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
