import { CLUB_HONORS, CLUB_INFO, CLUB_NEWS } from '../data/clubData';
import { Trophy, Award, Shield, Crown, Star, History, ArrowRight } from 'lucide-react';

export function ClubHistoryHonors() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Trophy': return Trophy;
      case 'Shield': return Shield;
      case 'Crown': return Crown;
      default: return Award;
    }
  };

  return (
    <section id="honors" className="py-20 bg-white text-neutral-900 border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-600/30 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>Club Heritage & Silverware Vault</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-black font-heading mt-2 uppercase tracking-tight">
            The Trophy Room & History
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3">
            Founded in {CLUB_INFO.founded}, Simolat Sporting FC was forged in determination and rose to become one of the most formidable powers in modern football.
          </p>
        </div>

        {/* Trophy Showcase Grid (White, Green, and Black cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {CLUB_HONORS.map((trophy) => {
            const Icon = getIcon(trophy.iconName);
            return (
              <div
                key={trophy.id}
                className="bg-neutral-950 text-white rounded-3xl border-2 border-emerald-500/30 p-6 text-center hover:border-emerald-400 transition-all shadow-xl hover:-translate-y-1 relative group"
              >
                {/* Trophy Glow */}
                <div className="w-20 h-20 mx-auto rounded-full bg-black border-2 border-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                  <Icon className="w-10 h-10 text-emerald-400" />
                </div>

                <div className="text-3xl font-black text-emerald-400 font-heading">
                  {trophy.count}x
                </div>

                <h3 className="text-lg font-black text-white font-heading mt-1 uppercase">
                  {trophy.title}
                </h3>

                <p className="text-xs text-neutral-400 mt-2">
                  {trophy.description}
                </p>

                {/* Years badge */}
                <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap justify-center gap-1.5">
                  {trophy.years.map((year) => (
                    <span
                      key={year}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-900 text-emerald-400 border border-emerald-500/30 font-mono"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Club Timeline (1994 to Present) */}
        <div className="bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-200">
          <div className="max-w-2xl mb-10">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-600" />
              <span>Three Decades of Supremacy</span>
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-black font-heading uppercase mt-1">
              Historical Timeline
            </h3>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-emerald-500/40">
            <div className="relative pl-10">
              <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              <div className="text-xs font-black text-emerald-700 uppercase font-mono">1994 - The Founding</div>
              <h4 className="text-lg font-bold text-black mt-0.5">Genesis in Victoria Island</h4>
              <p className="text-xs text-neutral-600 mt-1">
                Founded by Chief Dr. S. O. Atundaolu with a vision to nurture grassroots Nigerian footballing talent into world-class international professionals.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              <div className="text-xs font-black text-emerald-700 uppercase font-mono">2008 - First Continental Crown</div>
              <h4 className="text-lg font-bold text-black mt-0.5">Conquering the African Stage</h4>
              <p className="text-xs text-neutral-600 mt-1">
                Simolat Sporting FC lifted their maiden Continental Super Cup in Cairo with a thrilling 2-1 extra-time winner.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              <div className="text-xs font-black text-emerald-700 uppercase font-mono">2018 - St. Simolat Arena Opened</div>
              <h4 className="text-lg font-bold text-black mt-0.5">Ultra-Modern 48,500 Fortress</h4>
              <p className="text-xs text-neutral-600 mt-1">
                The club inaugurated its state-of-the-art stadium featuring UEFA Category 4 hybrid turf, sports science recovery labs, and acoustic roof design.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              <div className="text-xs font-black text-emerald-700 uppercase font-mono">2026 - Present Era of Glory</div>
              <h4 className="text-lg font-bold text-black mt-0.5">Unbeaten Season & Title Frontrunners</h4>
              <p className="text-xs text-neutral-600 mt-1">
                Under Coach Simeon Atundaolu, the Lions sit top of the Super League table boasting an 85% win rate and the league’s most lethal attack.
              </p>
            </div>
          </div>
        </div>

        {/* Official Club Press Desk */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-black font-heading uppercase">
              Official Club Dispatches & Press
            </h3>
            <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
              Updated Matchday 21
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLUB_NEWS.map((news) => (
              <div
                key={news.id}
                className="p-5 bg-white rounded-2xl border-2 border-emerald-500/20 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                      {news.category}
                    </span>
                    <span>{news.date}</span>
                  </div>
                  <h4 className="font-bold text-black text-sm uppercase leading-snug">
                    {news.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                    {news.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
