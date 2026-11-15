import { useState, useRef, useEffect } from 'react';
import { CLUB_INFO } from '../data/clubData';
import { soundEffects } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Building2, 
  HelpCircle,
  ShieldCheck,
  Calendar,
  Mic,
  Square,
  Loader2,
  Trash2
} from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Inquiries',
    subject: '',
    message: '',
  });

  const [submittedPass, setSubmittedPass] = useState<{ id: string; time: string } | null>(null);

  // Microphone recording & speech transcription state
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [micLang, setMicLang] = useState<'en-US' | 'fr-FR'>('en-US');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [micStatus, setMicStatus] = useState('');
  const [micError, setMicError] = useState('');
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBars, setAudioBars] = useState<number[]>([0.15, 0.25, 0.2, 0.3, 0.18]);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const speechCapturedRef = useRef(false);

  const cleanupMediaResources = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    setAudioBars([0.15, 0.25, 0.2, 0.3, 0.18]);
  };

  useEffect(() => {
    return () => {
      try { recognitionRef.current?.stop(); } catch (_) {}
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch (_) {}
      cleanupMediaResources();
    };
  }, []);

  const blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = String(reader.result || '');
        const commaIdx = result.indexOf(',');
        resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const transcribeViaServer = async (blob: Blob, mimeType: string) => {
    setIsTranscribing(true);
    setMicStatus('Transcribing recorded audio...');
    try {
      const audioBase64 = await blobToBase64(blob);
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64, mimeType, language: micLang }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setMicError(data?.error || 'Transcription could not complete.');
        setMicStatus('');
        return;
      }
      const text = String(data.transcript || '').trim();
      if (text) {
        setFormData((prev) => ({
          ...prev,
          message: prev.message.trim() ? `${prev.message.trim()} ${text}` : text,
        }));
        setMicStatus('Voice inquiry transcribed into your message.');
      } else {
        setMicStatus('No speech detected in the recording.');
      }
    } catch (_) {
      setMicError('Network error while transcribing voice recording.');
      setMicStatus('');
    } finally {
      setIsTranscribing(false);
    }
  };

  const stopVoiceInput = () => {
    setIsRecording(false);
    setInterimTranscript('');
    try { recognitionRef.current?.stop(); } catch (_) {}
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      cleanupMediaResources();
    }
  };

  const startVoiceInput = async () => {
    setMicError('');
    setMicStatus('');
    setInterimTranscript('');
    speechCapturedRef.current = false;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicError('Microphone access is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setIsRecording(true);
      setRecordingSeconds(0);
      setMicStatus('Listening... speak your inquiry clearly.');

      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);

      // Real Web Audio API analyser for responsive meter feedback
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 32;
        source.connect(analyser);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateMeter = () => {
          analyser.getByteFrequencyData(dataArray);
          const nextBars = [1, 3, 5, 7, 9].map((idx) =>
            Math.max(0.14, Math.min(1, (dataArray[idx] || 0) / 190))
          );
          setAudioBars(nextBars);
          rafRef.current = requestAnimationFrame(updateMeter);
        };
        rafRef.current = requestAnimationFrame(updateMeter);
      }

      // Live Web Speech API dictation when available
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        try {
          const recognition = new SpeechRec();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = micLang;
          recognition.onresult = (event: any) => {
            let finalChunk = '';
            let interimChunk = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const res = event.results[i];
              if (res.isFinal) finalChunk += res[0].transcript + ' ';
              else interimChunk += res[0].transcript;
            }
            setInterimTranscript(interimChunk.trim());
            if (finalChunk.trim()) {
              speechCapturedRef.current = true;
              setFormData((prev) => ({
                ...prev,
                message: prev.message.trim()
                  ? `${prev.message.trim()} ${finalChunk.trim()}`
                  : finalChunk.trim(),
              }));
            }
          };
          recognition.onerror = () => {};
          recognition.start();
          recognitionRef.current = recognition;
        } catch (_) {}
      }

      // Audio capture for reliable fallback transcription via /api/transcribe
      if (typeof MediaRecorder !== 'undefined') {
        const preferredTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
        const chosenMime = preferredTypes.find((t) => MediaRecorder.isTypeSupported(t)) || '';
        const recorder = chosenMime ? new MediaRecorder(stream, { mimeType: chosenMime }) : new MediaRecorder(stream);
        audioChunksRef.current = [];
        recorder.ondataavailable = (ev) => {
          if (ev.data && ev.data.size > 0) audioChunksRef.current.push(ev.data);
        };
        recorder.onstop = () => {
          const mime = recorder.mimeType || chosenMime || 'audio/webm';
          const recordedBlob = new Blob(audioChunksRef.current, { type: mime });
          cleanupMediaResources();
          if (!speechCapturedRef.current && recordedBlob.size > 512) {
            transcribeViaServer(recordedBlob, mime);
          } else if (speechCapturedRef.current) {
            setMicStatus('Live voice dictation added to your message.');
          } else {
            setMicStatus('Recording stopped.');
          }
        };
        recorder.start(250);
        mediaRecorderRef.current = recorder;
      }
    } catch (err: any) {
      cleanupMediaResources();
      setIsRecording(false);
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        setMicError('Microphone permission denied. Please allow microphone access to record.');
      } else {
        setMicError('Could not access microphone device. Please check your input settings.');
      }
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEffects.playGoalCheer();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    const ticketId = `SIM-REQ-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedPass({
      id: ticketId,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const departments = [
    { name: 'General Club Secretariat', email: 'secretariat@simolatsportingfc.com', phone: '+234 805 454 5933' },
    { name: 'Matchday Tickets & VIP Box', email: 'tickets@simolatsportingfc.com', phone: '+234 805 454 5933' },
    { name: 'Simolat Youth Academy Trials', email: 'academy@simolatsportingfc.com', phone: '+234 803 040 1744' },
    { name: 'Commercial Partnerships', email: 'sponsors@simolatsportingfc.com', phone: '+234 805 454 5933' },
  ];

  const faqs = [
    {
      q: 'How do I purchase official matchday tickets?',
      a: 'Tickets can be reserved directly online via our official Box Office portal, or in person at Gates 1-4 at St. Simolat Arena on matchdays.'
    },
    {
      q: 'When are Youth Academy scouting trials held?',
      a: 'Simolat Youth Academy conducts open trials bi-annually in June and November for age categories U-15, U-17, and U-19. Registration is available through our portal.'
    },
    {
      q: 'How can media personnel request press accreditation?',
      a: 'Media accreditation requests must be submitted at least 72 hours prior to kickoff via email to press@simolatsportingfc.com with official press credentials.'
    },
    {
      q: 'Are stadium tours available on non-matchdays?',
      a: 'Yes, guided stadium & trophy room tours run Tuesday through Friday between 10:00 AM and 4:00 PM.'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white text-neutral-900 border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-600/30 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Official Communications Desk</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-black font-heading uppercase tracking-tight">
            Contact Simolat Sporting FC
          </h2>
          <p className="text-base text-neutral-600 mt-2">
            Connect directly with the club secretariat, box office, youth academy scouting, or commercial team at St. Simolat Arena.
          </p>
        </div>

        {/* 3 Quick Contact Cards (White surfaces with emerald and black accents) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white rounded-2xl border-2 border-emerald-500/20 p-6 shadow-lg hover:border-emerald-500 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-black text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-black font-heading uppercase">Stadium & Headquarters</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              {CLUB_INFO.stadium}<br />
              14 Admiralty Way, Victoria Island<br />
              Lagos, Nigeria
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Office: Mon - Sat, 08:30 - 18:00</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-500/20 p-6 shadow-lg hover:border-emerald-500 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-black text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-black font-heading uppercase">Direct Telephone Lines</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              Matchday Box Office: +234 805 454 5933<br />
              Academy Trials Line: +234 803 040 1744<br />
              Emergency Match Operations: +234 805 454 5933
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Dedicated Matchday Hotline</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-emerald-500/20 p-6 shadow-lg hover:border-emerald-500 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-black text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-black font-heading uppercase">Official Electronic Mail</h3>
            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
              General: info@simolatsportingfc.com<br />
              Ticketing: tickets@simolatsportingfc.com<br />
              Press: media@simolatsportingfc.com
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Guaranteed Response within 24h</span>
            </div>
          </div>

        </div>

        {/* Main Interactive Contact Grid (Form + Department Directory) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* Left: Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-neutral-950 text-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
            
            {/* Emerald glow highlight */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-6">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block">
                Direct Dispatch
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase mt-1">
                Send an Official Message
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Fill out the secure communication form below. Your submission will be routed directly to the relevant club department.
              </p>
            </div>

            {submittedPass ? (
              <div className="bg-neutral-900 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-2xl font-black text-white font-heading uppercase">
                  Message Dispatched Successfully!
                </h4>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been logged under reference code:
                </p>
                <div className="inline-block bg-black border border-emerald-400/60 px-4 py-2 rounded-xl font-mono font-bold text-emerald-400 text-base">
                  {submittedPass.id}
                </div>
                <p className="text-[11px] text-neutral-400">
                  Logged at {submittedPass.time}. Our club liaison will reply to {formData.email} within 24 hours.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmittedPass(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        department: 'General Inquiries',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Oluwaseun Adeleke"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 ... / +44 ..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                      Target Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="General Inquiries">General Club Secretariat</option>
                      <option value="Ticketing & Hospitality">Matchday Tickets & Hospitality</option>
                      <option value="Academy Trials">Youth Academy Trials & Scouting</option>
                      <option value="Media & Press">Media & Press Relations</option>
                      <option value="Sponsorship">Commercial & Corporate Partnerships</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. VIP Box Reservation for Continental Clash"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Your Message / Detailed Request *
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        aria-label="Dictation language"
                        value={micLang}
                        disabled={isRecording || isTranscribing}
                        onChange={(e) => setMicLang(e.target.value as 'en-US' | 'fr-FR')}
                        className="bg-neutral-900 border border-neutral-700 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-neutral-200 focus:outline-none focus:border-emerald-400"
                      >
                        <option value="en-US">English</option>
                        <option value="fr-FR">Français</option>
                      </select>

                      <button
                        type="button"
                        onClick={isRecording ? stopVoiceInput : startVoiceInput}
                        disabled={isTranscribing}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isRecording
                            ? 'bg-red-600 hover:bg-red-500 text-white'
                            : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                        } disabled:opacity-50`}
                      >
                        {isTranscribing ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Transcribing...</span>
                          </>
                        ) : isRecording ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-current" />
                            <span className="tabular-nums">Stop ({formatTimer(recordingSeconds)})</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-3.5 h-3.5" />
                            <span>Dictate Inquiry</span>
                          </>
                        )}
                      </button>

                      {formData.message && !isRecording && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, message: '' }));
                            setMicStatus('');
                            setMicError('');
                          }}
                          title="Clear message"
                          aria-label="Clear message"
                          className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {(isRecording || interimTranscript || micStatus || micError) && (
                    <div className="mb-2.5 px-3 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-2 min-w-0">
                        {isRecording && (
                          <div className="flex items-end gap-0.5 h-3.5 shrink-0" aria-hidden="true">
                            {audioBars.map((level, i) => (
                              <span
                                key={i}
                                className="w-1 bg-emerald-400 rounded-sm transition-transform duration-75"
                                style={{ height: '14px', transform: `scaleY(${level})`, transformOrigin: 'bottom' }}
                              />
                            ))}
                          </div>
                        )}
                        <span className={micError ? 'text-red-400 font-medium' : 'text-emerald-300 font-medium truncate'}>
                          {micError || (interimTranscript ? `Hearing: "${interimTranscript}"` : micStatus)}
                        </span>
                      </div>
                    </div>
                  )}

                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Type or click 'Dictate Inquiry' to record and transcribe your message using your microphone..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message to Secretariat</span>
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right: Departmental Directory & Arena Access (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/20 shadow-lg space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <h4 className="text-xl font-black text-black font-heading uppercase">
                  Departmental Directory
                </h4>
              </div>

              <div className="space-y-3">
                {departments.map((dept, idx) => (
                  <div key={idx} className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1">
                    <div className="font-bold text-black text-xs uppercase">{dept.name}</div>
                    <div className="flex items-center justify-between text-xs text-neutral-600">
                      <span className="font-mono text-emerald-700">{dept.email}</span>
                      <span className="font-medium text-black">{dept.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stadium Visiting Guide & Matchday Parking */}
            <div className="bg-black text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <h4 className="text-xl font-black text-white font-heading uppercase">
                  Matchday Transport & Access
                </h4>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <span><strong>Gates Opening:</strong> Turnstiles open exactly 2 hours prior to kickoff.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <span><strong>Dedicated Parking:</strong> East & West P1 Arena Lots reserved for ticket holders with valid permits.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                  <span><strong>Public Transit:</strong> Victoria Island Ferry Terminal and Admiralty Shuttle express run directly to St. Simolat Plaza.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-200">
          <div className="max-w-2xl mb-8">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> Supporter Help Desk
            </span>
            <h3 className="text-3xl font-black text-black font-heading uppercase mt-1">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Quick answers regarding ticketing, trials, and club operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <h4 className="font-bold text-black text-sm">{faq.q}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
