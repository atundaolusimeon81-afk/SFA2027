import { CLUB_INFO } from '../data/clubData';
import { Shield, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  openTicketModal: () => void;
}

export function Footer({ onNavigate, openTicketModal }: FooterProps) {
  const sponsors = [
    { name: 'EMIRATES', tier: 'Principal Shirt Partner' },
    { name: 'NIKE FOOTBALL', tier: 'Official Kit Supplier' },
    { name: 'EA SPORTS FC', tier: 'Global Video Game Partner' },
    { name: 'STANDARD CHARTERED', tier: 'Official Banking Partner' },
    { name: 'SUPERSPORT', tier: 'Official Broadcast Partner' },
  ];

  return (
    <footer className="bg-black border-t border-emerald-500/30 text-neutral-400">
      
      {/* Official Partners Ribbon */}
      <div className="border-b border-neutral-900 bg-neutral-950 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6">
            Official Principal Partners & Sponsors
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 hover:opacity-100 transition-opacity">
            {sponsors.map((s, idx) => (
              <div key={idx} className="text-center group">
                <span className="font-heading font-black tracking-widest text-lg sm:text-xl text-neutral-300 group-hover:text-emerald-400 transition-colors uppercase">
                  {s.name}
                </span>
                <span className="block text-[9px] text-neutral-500 font-semibold uppercase tracking-wider">
                  {s.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Club Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-emerald-400 p-1 flex items-center justify-center shadow-lg">
                <img 
                  src={CLUB_INFO.crestImage} 
                  alt="Simolat FC" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-heading uppercase tracking-wide">
                  Simolat Sporting FC
                </h3>
                <span className="text-xs text-emerald-400 font-semibold">
                  The Pride of Simolat · Est. {CLUB_INFO.founded}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Dedicated to world-class sporting excellence, attacking football, elite youth academy progression, and uniting supporters under pure white, sovereign emerald green, and black.
            </p>

            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{CLUB_INFO.stadium}, {CLUB_INFO.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>info@simolatsportingfc.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+234 805 454 5933 (Matchday Box Office)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Club & Matches
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors">
                  Club Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('matches')} className="hover:text-emerald-400 transition-colors">
                  Fixtures & Results
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('matches')} className="hover:text-emerald-400 transition-colors">
                  League Standings
                </button>
              </li>
              <li>
                <button onClick={openTicketModal} className="text-emerald-400 hover:text-emerald-300 font-semibold">
                  Matchday Tickets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('honors')} className="hover:text-emerald-400 transition-colors">
                  Trophy Cabinet
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-emerald-400 transition-colors">
                  Media & Match Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Football Operations */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Team & Academy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('squad')} className="hover:text-emerald-400 transition-colors">
                  First Team Squad
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tactics')} className="hover:text-emerald-400 transition-colors">
                  Tactical Board & Pitch
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('performance')} className="hover:text-emerald-400 transition-colors text-emerald-400 font-bold">
                  Performance & Injury Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fanzone')} className="hover:text-emerald-400 transition-colors">
                  Youth Academy Trials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-emerald-400 transition-colors">
                  Official Megastore
                </button>
              </li>
            </ul>
          </div>

          {/* Supporters & Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Supporters & Contact
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors text-white font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Contact Us & Box Office</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fanzone')} className="hover:text-emerald-400 transition-colors">
                  Lions Membership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fanzone')} className="hover:text-emerald-400 transition-colors">
                  Matchday Chants
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Matchday Hospitality</span>
              </li>
              <li>
                <span className="text-neutral-500">Press & Accreditation</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Simolat Sporting Football Club. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-neutral-400">
            <span>Powered by the passion of The Lions</span>
            <Shield className="w-3.5 h-3.5 text-emerald-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
