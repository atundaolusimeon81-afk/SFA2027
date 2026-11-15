import { useState } from 'react';
import { SQUAD_PERFORMANCE_DATA, ActiveInjury } from '../../data/performanceData';
import { soundEffects } from '../../utils/audioEffects';
import confetti from 'canvas-confetti';
import { X, ShieldAlert, CheckCircle2, Activity, Calendar } from 'lucide-react';

interface LogMedicalModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRegion?: string;
  onSaveInjury: (newInjury: ActiveInjury) => void;
}

export function LogMedicalModal({
  isOpen,
  onClose,
  preselectedRegion,
  onSaveInjury,
}: LogMedicalModalProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(SQUAD_PERFORMANCE_DATA[2].playerId); // Amadi default
  const [bodyRegion, setBodyRegion] = useState<ActiveInjury['bodyRegion']>(
    (preselectedRegion?.includes('hamstring') ? 'hamstrings' :
     preselectedRegion?.includes('ankle') ? 'ankle' :
     preselectedRegion?.includes('knee') ? 'knee' :
     preselectedRegion?.includes('groin') ? 'adductor' : 'hamstrings') as ActiveInjury['bodyRegion']
  );
  const [side, setSide] = useState<'left' | 'right' | 'bilateral'>('right');
  const [severity, setSeverity] = useState<ActiveInjury['severity']>('Mild (Grade 1)');
  const [mechanism, setMechanism] = useState<ActiveInjury['mechanism']>('Non-contact sprint');
  const [injuryName, setInjuryName] = useState<string>('Right Biceps Femoris Grade 1 Strain');
  const [expectedDays, setExpectedDays] = useState<number>(14);
  const [physioNotes, setPhysioNotes] = useState<string>('Felt acute twinge during 30m maximum velocity sprint. Ultrasound planned for tomorrow.');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const player = SQUAD_PERFORMANCE_DATA.find((p) => p.playerId === selectedPlayerId) || SQUAD_PERFORMANCE_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + expectedDays);
    const targetFormatted = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newInjury: ActiveInjury = {
      id: `inj-${Date.now()}`,
      playerId: player.playerId,
      playerName: player.name,
      playerNumber: player.number,
      position: player.position,
      injuryName,
      bodyRegion,
      side,
      severity,
      mechanism,
      diagnosisDate: new Date().toISOString().split('T')[0],
      targetReturnDate: targetFormatted,
      daysSidelined: 1,
      expectedDaysTotal: expectedDays,
      rehabPhase: 1,
      rehabPhaseTitle: 'Phase 1: Protection & Acute Pain Management',
      progressPct: 10,
      clearanceStatus: 'Restricted',
      physioAssigned: 'Dr. Elena Rossi & Chief Physio Adeleke',
      treatmentProtocol: [
        'Cryotherapy and pneumatic compression (20 mins x 3/day)',
        'Isometric loading within pain-free threshold',
        'Pelvic alignment and core stabilization',
      ],
      milestones: [
        { title: 'Pain-free normal gait and ambulation', completed: false, targetDate: 'Day 3' },
        { title: 'NordBord isometric eccentric strength > 70% symmetry', completed: false, targetDate: 'Day 7' },
        { title: 'Submaximal straight-line jog at 65% velocity', completed: false, targetDate: 'Day 10' },
        { title: 'Full velocity sprint and change of direction clearance', completed: false, targetDate: targetFormatted },
      ],
      notes: physioNotes,
    };

    onSaveInjury(newInjury);
    soundEffects.playWhistle();
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-neutral-950 border-2 border-emerald-500/40 rounded-3xl max-w-xl w-full my-8 overflow-hidden shadow-2xl relative text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-neutral-900 to-emerald-950/80 p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-md">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Medical & Sports Science Portal
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading uppercase">
                Log New Clinical Incident
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-2xl font-black text-white font-heading uppercase">
              Incident Successfully Recorded!
            </h4>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto">
              Clinical entry logged for <strong className="text-white">{player.name} (#{player.number})</strong>. Telemetry status updated to Sidelined / Phase 1 RTP.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Player Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                Squad Member / Athlete
              </label>
              <select
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {SQUAD_PERFORMANCE_DATA.map((p) => (
                  <option key={p.playerId} value={p.playerId}>
                    #{p.number} {p.name} ({p.positionShort}) - Current: {p.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Injury Name */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                Clinical Diagnosis / Injury Title
              </label>
              <input
                type="text"
                required
                value={injuryName}
                onChange={(e) => setInjuryName(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                placeholder="e.g. Left Rectus Femoris Strain"
              />
            </div>

            {/* Region & Side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                  Anatomical Region
                </label>
                <select
                  value={bodyRegion}
                  onChange={(e) => setBodyRegion(e.target.value as ActiveInjury['bodyRegion'])}
                  className="w-full bg-black border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="hamstrings">Hamstrings (Biceps/ST)</option>
                  <option value="adductor">Adductor / Groin</option>
                  <option value="quadriceps">Quadriceps</option>
                  <option value="knee">Knee (Ligaments/Meniscus)</option>
                  <option value="ankle">Ankle (ATFL/CFL)</option>
                  <option value="calf">Calf (Gastrocnemius/Soleus)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                  Laterality
                </label>
                <select
                  value={side}
                  onChange={(e) => setSide(e.target.value as typeof side)}
                  className="w-full bg-black border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="right">Right Side</option>
                  <option value="left">Left Side</option>
                  <option value="bilateral">Bilateral</option>
                </select>
              </div>
            </div>

            {/* Severity & Mechanism */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                  Severity Grade
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as ActiveInjury['severity'])}
                  className="w-full bg-black border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Mild (Grade 1)">Mild (Grade 1)</option>
                  <option value="Moderate (Grade 2)">Moderate (Grade 2)</option>
                  <option value="Severe (Grade 3)">Severe (Grade 3)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                  Injury Mechanism
                </label>
                <select
                  value={mechanism}
                  onChange={(e) => setMechanism(e.target.value as ActiveInjury['mechanism'])}
                  className="w-full bg-black border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Non-contact sprint">Non-contact sprint</option>
                  <option value="Twisting / Change of direction">Twisting / Change of direction</option>
                  <option value="Contact">Contact tackle</option>
                  <option value="Overuse / Fatigue">Overuse / Fatigue</option>
                  <option value="Overuse / Chronic load">Overuse / Chronic load</option>
                </select>
              </div>
            </div>

            {/* Expected Recovery Days */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-neutral-300 uppercase tracking-wider">
                  Target Recovery Duration:
                </span>
                <span className="font-heading font-black text-emerald-400 text-sm">
                  {expectedDays} Days (~{Math.round(expectedDays / 7)} Weeks)
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={90}
                value={expectedDays}
                onChange={(e) => setExpectedDays(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Physio Notes */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                Initial Clinical Observation & Plan
              </label>
              <textarea
                rows={3}
                value={physioNotes}
                onChange={(e) => setPhysioNotes(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                placeholder="Diagnostic notes, scan status, early loading directives..."
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Confirm Clinical Registration
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
