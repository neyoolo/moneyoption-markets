import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, ShieldCheck, Clock, UserCheck, X } from 'lucide-react';

interface CallDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallDeskModal: React.FC<CallDeskModalProps> = ({ isOpen, onClose }) => {
  const [callState, setCallState] = useState<'dialing' | 'connected' | 'ended'>('dialing');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setCallState('dialing');
      setSeconds(0);
      setIsMuted(false);
      return;
    }

    // Simulate instant routing in ~2.5 seconds
    const timer = setTimeout(() => {
      setCallState('connected');
    }, 2200);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="call-desk-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="call-desk-modal"
        className="w-full max-w-md bg-[#0b1b38] text-white rounded-3xl p-6 shadow-2xl border border-slate-700/60 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient circle */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#1e6bff]/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/60 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Brand */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00C48C] animate-ping"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#50d9fe]">
            NYC Floor Dealing Desk • Line 1
          </span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center my-4">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0053d4] to-[#1e6bff] flex items-center justify-center shadow-lg shadow-[#1e6bff]/30">
              <Phone className={`w-9 h-9 text-white ${callState === 'dialing' ? 'animate-bounce' : ''}`} />
            </div>
            {callState === 'connected' && (
              <span className="absolute -bottom-1 -right-1 p-1 bg-[#00C48C] rounded-full text-slate-900 border-2 border-[#0b1b38]">
                <UserCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-1">
            {callState === 'dialing' ? 'Connecting to Priority Queue...' : 'Connected with Floor Broker'}
          </h3>
          <p className="text-xs text-slate-300 font-mono mb-2">
            +1 (800) 555-0199 • Toll-Free Worldwide
          </p>

          {callState === 'dialing' ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#50d9fe] animate-spin" />
              <span>Skipping automated phone trees... (&lt; 30s)</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="text-2xl font-mono font-bold text-[#00C48C] tracking-widest">
                {formatTime(seconds)}
              </div>
              <div className="text-xs text-slate-300 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00C48C]" />
                <span>Broker: Marcus Vance (FINRA Series 3/7 Licensed)</span>
              </div>
              {/* Simulated Audio waveform */}
              <div className="flex items-center gap-1 h-6 my-2">
                {[40, 75, 100, 60, 85, 30, 90, 50, 70, 30].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1 bg-[#50d9fe] rounded-full animate-pulse transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-all cursor-pointer ${
              isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-3.5 rounded-full transition-all cursor-pointer ${
              isSpeaker ? 'bg-[#1e6bff]/20 text-[#50d9fe] border border-[#1e6bff]/40' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Speakerphone"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call</span>
          </button>
        </div>

        {/* Fallback Native Tel Option */}
        <div className="mt-4 text-center">
          <a
            href="tel:+18005550199"
            className="text-[11px] text-slate-400 hover:text-[#50d9fe] underline transition-colors"
          >
            Or launch phone app: dial +1 (800) 555-0199 directly
          </a>
        </div>
      </div>
    </div>
  );
};
