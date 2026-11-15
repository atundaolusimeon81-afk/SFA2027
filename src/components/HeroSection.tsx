import { useState, useEffect } from 'react';
import { CLUB_INFO, NEXT_MATCH } from '../data/clubData';
import { Ticket, Users, ShoppingBag, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenTickets: () => void;
}

export function HeroSection({ onNavigate, onOpenTickets }: HeroSectionProps) {
  // Live Countdown to match
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Stadium Background Image with cinematic emerald atmospheric overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={CLUB_INFO.stadiumImage}
          alt="St. Simolat Arena Stadium"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-50 scale-105 transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-emerald-950/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline separator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-emerald-500/40 backdrop-blur-md text-xs font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>OFFICIAL CLUB PORTAL</span>
              <span className="text-neutral-500">·</span>
              <span className="text-white">EST. {CLUB_INFO.founded}</span>
              <span className="text-neutral-500">·</span>
              <span className="text-emerald-400">LEAGUE LEADERS</span>
            </div>

            {/* Giant Title */}
            <div>
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white font-heading leading-none">
                SIMOLAT <br />
                <span className="emerald-gradient-text drop-shadow-[0_10px_25px_rgba(16,185,129,0.35)]">
                  SPORTING FC
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed">
                Welcome to the home of <strong className="text-white font-semibold">The Lions</strong>. 
                Reigning Continental champions and four-time domestic title winners. 
                Forged in pure white, sovereign emerald green, and deep black grit.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenTickets}
                className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Ticket className="w-5 h-5" />
                <span>Get Match Tickets</span>
              </button>

              <button
                onClick={() => onNavigate('squad')}
                className="flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-black px-6 py-3.5 rounded-xl font-black text-sm tracking-wide shadow-lg transition-all cursor-pointer"
              >
                <Users className="w-5 h-5 text-emerald-600" />
                <span>First Team Squad</span>
              </button>

              <button
                onClick={() => onNavigate('store')}
                className="flex items-center gap-2.5 bg-neutral-900/90 hover:bg-neutral-800 text-white border border-emerald-500/40 px-5 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <span>Official Kit Shop</span>
              </button>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-800 text-left">
              <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">#1</div>
                <div className="text-xs text-neutral-400 uppercase font-semibold">League Position</div>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-white font-heading">49 PTS</div>
                <div className="text-xs text-neutral-400 uppercase font-semibold">20 Matchdays</div>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">46</div>
                <div className="text-xs text-neutral-400 uppercase font-semibold">Goals Scored</div>
              </div>
              <div className="bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-black text-white font-heading">4x</div>
                <div className="text-xs text-neutral-400 uppercase font-semibold">League Crowns</div>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Next Match Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-neutral-900/95 via-black to-neutral-950 rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-7 shadow-2xl backdrop-blur-xl emerald-border-glow">
              
              {/* Card Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-base">{NEXT_MATCH.competitionBadge}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {NEXT_MATCH.competition}
                  </span>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Matchday {NEXT_MATCH.matchday}
                </span>
              </div>

              {/* Head to Head Teams */}
              <div className="py-6 flex items-center justify-between">
                
                {/* Simolat Sporting FC */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-black p-1 border-2 border-emerald-400 shadow-lg flex items-center justify-center">
                    <img 
                      src={CLUB_INFO.crestImage} 
                      alt="Simolat FC" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="mt-2 text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                    SIMOLAT
                  </h4>
                  <span className="text-[11px] text-emerald-400 font-semibold">1st · Home</span>
                </div>

                {/* Versus Badge */}
                <div className="px-3 text-center shrink-0">
                  <span className="text-xs font-black text-black bg-emerald-400 px-2.5 py-1 rounded-md font-heading uppercase">
                    VS
                  </span>
                  <div className="text-[11px] text-neutral-400 mt-2 font-mono">{NEXT_MATCH.time}</div>
                </div>

                {/* Opponent */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-neutral-900 p-2 border-2 border-neutral-700 flex items-center justify-center text-3xl">
                    {NEXT_MATCH.opponentBadge}
                  </div>
                  <h4 className="mt-2 text-sm sm:text-base font-bold text-neutral-200 uppercase tracking-tight">
                    {NEXT_MATCH.opponent}
                  </h4>
                  <span className="text-[11px] text-neutral-400 font-semibold">2nd · Away</span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-black/90 rounded-2xl p-4 border border-neutral-800 text-center">
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Kickoff Countdown
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-neutral-900 p-2 rounded-xl border border-neutral-800">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">{timeLeft.days}</div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-400">Days</div>
                  </div>
                  <div className="bg-neutral-900 p-2 rounded-xl border border-neutral-800">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">{timeLeft.hours}</div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-400">Hours</div>
                  </div>
                  <div className="bg-neutral-900 p-2 rounded-xl border border-neutral-800">
                    <div className="text-xl sm:text-2xl font-black text-white font-heading">{timeLeft.minutes}</div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-400">Mins</div>
                  </div>
                  <div className="bg-neutral-900 p-2 rounded-xl border border-neutral-800">
                    <div className="text-xl sm:text-2xl font-black text-emerald-400 font-heading">{timeLeft.seconds}</div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-400">Secs</div>
                  </div>
                </div>
              </div>

              {/* Venue details */}
              <div className="mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
                <span>📍 {NEXT_MATCH.stadium}</span>
                <span className="text-emerald-400 font-medium">{NEXT_MATCH.attendance}</span>
              </div>

              {/* Quick Card Footer Action */}
              <div className="mt-4">
                <button
                  onClick={onOpenTickets}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Seats for This Clash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
