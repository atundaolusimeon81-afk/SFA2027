import { useState } from 'react';
import { STADIUM_STANDS, UPCOMING_FIXTURES, CLUB_INFO, Match } from '../data/clubData';
import { soundEffects } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import { Ticket, X, CheckCircle, QrCode, Shield, Download, Printer } from 'lucide-react';

interface TicketOfficeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TicketOfficeModal({ isOpen, onClose }: TicketOfficeModalProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match>(UPCOMING_FIXTURES[0]);
  const [selectedStand, setSelectedStand] = useState(STADIUM_STANDS[1]); // Default King's Terrace
  const [quantity, setQuantity] = useState<number>(2);
  const [ticketType, setTicketType] = useState<'adult' | 'junior'>('adult');
  const [fanName, setFanName] = useState<string>('Alex Johnson');
  const [fanEmail, setFanEmail] = useState<string>('alex.football@gmail.com');
  const [issuedPass, setIssuedPass] = useState<{
    id: string;
    seat: string;
    gate: string;
    qrSeed: string;
  } | null>(null);

  if (!isOpen) return null;

  const basePrice = selectedStand.price;
  const unitPrice = ticketType === 'junior' ? Math.round(basePrice * 0.75) : basePrice;
  const totalPrice = unitPrice * quantity;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanName || !fanEmail) return;

    soundEffects.playGoalCheer();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    const randomRow = ['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)];
    const randomSeatStart = Math.floor(Math.random() * 30) + 1;
    const seatDesc = `Row ${randomRow}, Seats ${randomSeatStart} - ${randomSeatStart + quantity - 1}`;
    const bookingId = `SIM-${Math.floor(100000 + Math.random() * 900000)}`;

    setIssuedPass({
      id: bookingId,
      seat: seatDesc,
      gate: selectedStand.gate,
      qrSeed: `${bookingId}-${selectedStand.id}-${selectedMatch.opponentAbbr}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/70 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-amber-400 p-1 flex items-center justify-center shadow-lg">
              <img 
                src={CLUB_INFO.crestImage} 
                alt="Crest" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Official Club Box Office
              </div>
              <h3 className="text-2xl font-black text-white font-heading uppercase">
                St. Simolat Arena Tickets
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {issuedPass ? (
            /* Digital E-Ticket Pass View */
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-2xl font-black text-white font-heading uppercase">
                  Matchday Pass Confirmed!
                </h4>
                <p className="text-xs text-slate-300">
                  Your digital boarding pass has been registered to {fanEmail}.
                </p>
              </div>

              {/* Realistic Mobile E-Ticket Card */}
              <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 rounded-2xl border-2 border-amber-400/80 p-6 shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Ticket Top bar */}
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-700">
                  <div className="flex items-center gap-2">
                    <img 
                      src={CLUB_INFO.crestImage} 
                      alt="Crest" 
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 object-contain" 
                    />
                    <span className="font-heading font-black tracking-wider text-sm uppercase">
                      Simolat Sporting FC
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    PASS #{issuedPass.id}
                  </span>
                </div>

                {/* Match Information */}
                <div className="py-4 space-y-1">
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                    {selectedMatch.competition}
                  </div>
                  <div className="text-xl font-black font-heading text-white">
                    Simolat Sporting FC vs {selectedMatch.opponent}
                  </div>
                  <div className="text-xs text-slate-300">
                    📅 {selectedMatch.date} · ⏰ {selectedMatch.time}
                  </div>
                  <div className="text-xs text-slate-400">
                    📍 {selectedMatch.stadium}
                  </div>
                </div>

                {/* Seat and Gate Grid */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs my-2">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Stand</div>
                    <div className="font-bold text-amber-400 truncate">{selectedStand.name.split('(')[0]}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Turnstile</div>
                    <div className="font-bold text-white">{issuedPass.gate}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Seating</div>
                    <div className="font-bold text-emerald-400 truncate">{issuedPass.seat}</div>
                  </div>
                </div>

                {/* Ticket holder & Simulated QR */}
                <div className="pt-4 border-t border-dashed border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Ticket Holder</div>
                    <div className="font-bold text-sm text-white">{fanName}</div>
                    <div className="text-[10px] text-slate-400">{quantity}x {ticketType === 'adult' ? 'Standard Adult' : 'Junior/Concession'} · €{totalPrice} Paid</div>
                  </div>

                  {/* QR Code Graphic */}
                  <div className="bg-white p-2 rounded-xl flex items-center justify-center text-slate-950 shadow-md">
                    <QrCode className="w-12 h-12" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Match Pass</span>
                </button>
                <button
                  onClick={() => {
                    setIssuedPass(null);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Done & Return to Club Site</span>
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBooking} className="space-y-5">
              
              {/* Select Fixture */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  1. Select Fixture
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {UPCOMING_FIXTURES.slice(0, 3).map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setSelectedMatch(m)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedMatch.id === m.id
                          ? 'bg-amber-500/10 border-amber-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-[10px] text-amber-400 font-bold uppercase">{m.competition}</div>
                      <div className="font-bold text-xs text-white truncate mt-0.5">vs {m.opponent}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{m.date.split(',')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Stand */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  2. Choose Stadium Stand
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {STADIUM_STANDS.map((stand) => (
                    <button
                      type="button"
                      key={stand.id}
                      onClick={() => setSelectedStand(stand)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        selectedStand.id === stand.id
                          ? 'bg-blue-950/60 border-amber-400 text-white ring-1 ring-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{stand.name}</span>
                        <span className="font-black text-amber-400 text-sm">€{stand.price}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{stand.atmosphere}</p>
                      <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                        ● {stand.available} seats remaining
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ticket details (Quantity & Type) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    3. Number of Seats
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 6].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setQuantity(num)}
                        className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                          quantity === num
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Ticket Category
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTicketType('adult')}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        ticketType === 'adult'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      Adult
                    </button>
                    <button
                      type="button"
                      onClick={() => setTicketType('junior')}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        ticketType === 'junior'
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      Junior (-25%)
                    </button>
                  </div>
                </div>
              </div>

              {/* Fan Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Lead Supporter Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fanName}
                    onChange={(e) => setFanName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Email for E-Ticket Delivery
                  </label>
                  <input
                    type="email"
                    required
                    value={fanEmail}
                    onChange={(e) => setFanEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Price Breakdown & Submission */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase">Total Matchday Investment</div>
                  <div className="text-2xl font-black text-amber-400 font-heading">€{totalPrice}</div>
                  <div className="text-[10px] text-slate-500">{quantity}x seats · St. Simolat Arena</div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Confirm & Issue Matchday Pass</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
