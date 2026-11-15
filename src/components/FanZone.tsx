import { useState } from 'react';
import { CLUB_INFO } from '../data/clubData';
import { soundEffects } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import { Heart, Volume2, Award, CheckCircle, Shield, Sparkles, Send } from 'lucide-react';

export function FanZone() {
  // Player of the month voting
  const [votes, setVotes] = useState<Record<string, number>>({
    'mensah': 462,
    'adeleke': 389,
    'olatunji': 214,
    'sterling': 178,
  });
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [votedCandidate, setVotedCandidate] = useState<string | null>(null);

  // Academy Trial Form
  const [trialSubmitted, setTrialSubmitted] = useState<boolean>(false);
  const [trialForm, setTrialForm] = useState({
    name: '',
    age: '17',
    position: 'Striker',
    phone: '',
    email: '',
    city: 'Lagos',
  });

  // Membership Pass
  const [memberPass, setMemberPass] = useState<{ id: string; name: string } | null>(null);
  const [memberNameInput, setMemberNameInput] = useState('');

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleVote = (candidateKey: string) => {
    if (hasVoted) return;

    soundEffects.playGoalCheer();
    confetti({
      particleCount: 60,
      spread: 70,
    });

    setVotes((prev) => ({
      ...prev,
      [candidateKey]: (prev[candidateKey] || 0) + 1,
    }));
    setHasVoted(true);
    setVotedCandidate(candidateKey);
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialForm.name || !trialForm.phone || !trialForm.email) return;

    soundEffects.playWhistle();
    confetti({
      particleCount: 40,
      spread: 60,
    });

    setTrialSubmitted(true);
  };

  const handleJoinMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberNameInput) return;

    soundEffects.playGoalCheer();
    confetti({
      particleCount: 80,
      spread: 90,
    });

    const newId = `LION-${Math.floor(10000 + Math.random() * 90000)}`;
    setMemberPass({
      id: newId,
      name: memberNameInput,
    });
  };

  return (
    <section id="fanzone" className="py-20 bg-neutral-950 text-white border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 fill-emerald-400" />
            <span>The 12th Player Experience</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-heading mt-2 uppercase tracking-tight">
            Simolat Lions Fan Zone
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-3">
            Vote for Player of the Month, join the official Lions Club membership, trigger matchday acoustics, and register for academy trials.
          </p>
        </div>

        {/* Fan Zone Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Player of the Month Poll (7 Cols) */}
          <div className="lg:col-span-7 bg-black rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-black text-white font-heading uppercase">
                  Player of the Month Poll
                </h3>
              </div>
              <span className="text-xs text-neutral-400">
                {totalVotes} verified votes
              </span>
            </div>

            <p className="text-xs text-neutral-300">
              Select your standout Lion for October 2026. Every verified vote counts towards the club's prestigious monthly ceremony.
            </p>

            {/* Candidates */}
            <div className="space-y-3">
              {[
                { key: 'mensah', name: 'Kwame Mensah (#14)', desc: '19 Goals · Match-winning hat-trick against Dynamos', color: 'bg-emerald-500' },
                { key: 'adeleke', name: 'Simeon Adeleke (#8)', desc: 'Talisman playmaker · 8 goals & 9 assists', color: 'bg-white' },
                { key: 'olatunji', name: 'David Olatunji (#1)', desc: 'Wall in goal · 11 league clean sheets', color: 'bg-emerald-400' },
                { key: 'sterling', name: 'Marcus Sterling (#4)', desc: 'Captain · Defensive masterclass & 3 goals', color: 'bg-neutral-400' },
              ].map((candidate) => {
                const count = votes[candidate.key] || 0;
                const pct = Math.round((count / totalVotes) * 100);
                const isSelected = votedCandidate === candidate.key;

                return (
                  <div
                    key={candidate.key}
                    onClick={() => handleVote(candidate.key)}
                    className={`p-4 rounded-2xl border transition-all relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-500/15'
                        : 'border-neutral-800 bg-neutral-900/90 hover:border-neutral-700'
                    }`}
                  >
                    {/* Background Progress Bar */}
                    <div
                      className="absolute inset-y-0 left-0 bg-emerald-950/40 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white uppercase font-heading">
                            {candidate.name}
                          </h4>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Your Vote
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{candidate.desc}</p>
                      </div>

                      <div className="text-right shrink-0 pl-4">
                        <div className="text-lg font-black text-emerald-400 font-heading">{pct}%</div>
                        <div className="text-[10px] text-neutral-400">{count} votes</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasVoted && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-700 rounded-xl text-center text-xs text-emerald-300 font-semibold flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Your official vote has been recorded on the Lions ledger.</span>
              </div>
            )}
          </div>

          {/* Right Column: Matchday Audio Board & Chants (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Audio Soundboard */}
            <div className="bg-black rounded-3xl border-2 border-emerald-500/30 p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                <Volume2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-black text-white font-heading uppercase">
                  Matchday Acoustic Soundboard
                </h3>
              </div>

              <p className="text-xs text-neutral-400">
                Synthesize matchday acoustics right in your browser via our Web Audio engine!
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => soundEffects.playHorn()}
                  className="p-3 rounded-xl bg-neutral-900 hover:bg-emerald-950/60 border border-neutral-800 hover:border-emerald-500/50 text-center transition-all cursor-pointer group"
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">📢</div>
                  <div className="text-xs font-bold text-white uppercase font-heading">Stadium Horn</div>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">Bb Minor Blast</span>
                </button>

                <button
                  onClick={() => soundEffects.playWhistle()}
                  className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-center transition-all cursor-pointer group"
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">📯</div>
                  <div className="text-xs font-bold text-white uppercase font-heading">Ref Whistle</div>
                  <span className="text-[9px] text-neutral-400 block mt-0.5">Match Kickoff</span>
                </button>

                <button
                  onClick={() => soundEffects.playGoalCheer()}
                  className="p-3 rounded-xl bg-neutral-900 hover:bg-emerald-950/60 border border-neutral-800 hover:border-emerald-500/50 text-center transition-all cursor-pointer group"
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">⚽</div>
                  <div className="text-xs font-bold text-emerald-300 uppercase font-heading">Goal Cheer</div>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">Roar & Chimes</span>
                </button>
              </div>

              {/* Anthem lyrics */}
              <div className="mt-4 pt-4 border-t border-neutral-800 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">
                  Official Club Anthem (The Lions Cry)
                </div>
                <blockquote className="text-xs text-neutral-200 italic font-medium leading-relaxed">
                  "From Victoria Island to the world on high,<br />
                  Hear the roar of the Lions touch the sky!<br />
                  Green and white our honor, sovereign pride our might,<br />
                  Simolat Sporting FC, champions tonight!"
                </blockquote>
              </div>
            </div>

            {/* Official Digital Membership Pass Generator */}
            <div className="bg-black rounded-3xl border-2 border-emerald-500/30 p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-black text-white font-heading uppercase">
                  Official Lions Membership
                </h3>
              </div>

              {memberPass ? (
                <div className="bg-gradient-to-r from-black via-neutral-900 to-emerald-950/80 p-5 rounded-2xl border-2 border-emerald-400 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={CLUB_INFO.crestImage} alt="Crest" referrerPolicy="no-referrer" className="w-8 h-8 object-contain" />
                      <span className="font-heading font-black text-sm uppercase text-white">Simolat Member Card</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500 text-black font-black px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-neutral-400">Cardholder</div>
                    <div className="text-lg font-black text-white font-heading uppercase">{memberPass.name}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-xs">
                    <span className="font-mono text-emerald-400">{memberPass.id}</span>
                    <span className="text-[10px] text-neutral-300">Lifetime Supporter</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleJoinMembership} className="space-y-3">
                  <p className="text-xs text-neutral-400">
                    Get your official Simolat digital member pass, early ticket access, and 10% megastore discount.
                  </p>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Your Full Name"
                      value={memberNameInput}
                      onChange={(e) => setMemberNameInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    Generate Official Member Pass
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Simolat Academy Talent Trial Registration */}
        <div className="bg-gradient-to-r from-black via-neutral-950 to-emerald-950/70 rounded-3xl border-2 border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Next Generation Stars
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-heading mt-1 uppercase">
              Simolat Youth Academy Trials (U-15 to U-19)
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2">
              Are you the next Simeon Adeleke or Kwame Mensah? Register your profile for our upcoming bi-annual scouting assessment at St. Simolat Arena.
            </p>
          </div>

          <div className="mt-8">
            {trialSubmitted ? (
              <div className="bg-black/80 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2 max-w-lg">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white font-heading uppercase">Trial Profile Registered!</h4>
                <p className="text-xs text-neutral-300">
                  Our youth scouting team will review your footballing bio and send trial date accreditation to <strong className="text-emerald-400">{trialForm.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTrialSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Babatunde Johnson"
                    value={trialForm.name}
                    onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase mb-1">Age Category</label>
                  <select
                    value={trialForm.age}
                    onChange={(e) => setTrialForm({ ...trialForm, age: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="15">Under 15 (U-15)</option>
                    <option value="16">Under 16 (U-16)</option>
                    <option value="17">Under 17 (U-17)</option>
                    <option value="18">Under 18 (U-18)</option>
                    <option value="19">Under 19 (U-19)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase mb-1">Primary Pitch Role</label>
                  <select
                    value={trialForm.position}
                    onChange={(e) => setTrialForm({ ...trialForm, position: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Center Back">Center Back (DF)</option>
                    <option value="Full Back">Full Back (LB/RB)</option>
                    <option value="Defensive Midfield">Defensive Midfield (CDM)</option>
                    <option value="Central Midfield">Central Midfield (CM/CAM)</option>
                    <option value="Winger">Winger (LW/RW)</option>
                    <option value="Striker">Center Forward (ST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 ..."
                    value={trialForm.phone}
                    onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="prospect@email.com"
                    value={trialForm.email}
                    onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Scouting Dossier</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
