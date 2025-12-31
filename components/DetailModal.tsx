
import React, { useEffect, useState } from 'react';
import { ISOStandard } from '../types';
import { getStandardDetails } from '../services/geminiService';

interface DetailModalProps {
  standard: ISOStandard | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ standard, onClose }) => {
  const [details, setDetails] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (standard) {
      setLoading(true);
      getStandardDetails(standard.number).then(text => {
        setDetails(text || '');
        setLoading(false);
      });
    }
  }, [standard]);

  if (!standard) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col">
        
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-cyan-950/20">
          <div>
            <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 animate-pulse"></div>
                <span className="mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest">System Analysis // Standard Profile</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">ISO/IEC {standard.number}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white border border-transparent hover:border-white/20"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-cyan-500/20 rounded-full animate-ping"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
              </div>
              <p className="mono text-xs text-cyan-400 animate-pulse uppercase tracking-[0.3em]">Downloading Intelligence...</p>
            </div>
          ) : (
            <div className="text-slate-300 space-y-8 leading-relaxed">
              <div className="bg-cyan-500/5 p-5 rounded border border-cyan-500/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <h4 className="text-cyan-400 font-bold uppercase text-xs tracking-widest mb-2 flex items-center">
                    <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    Primary Scope
                </h4>
                <p className="text-slate-300 italic text-sm">{standard.shortDescription}</p>
              </div>

              <div className="prose prose-invert prose-cyan max-w-none prose-p:text-slate-400 prose-headings:text-cyan-400 prose-strong:text-white">
                {/* Manual markdown-like rendering for cleaner output in cyber theme */}
                <div className="whitespace-pre-wrap font-light text-sm">
                    {details}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-black/40 border-t border-white/5 flex justify-end items-center space-x-4">
          <span className="mono text-[8px] text-slate-600 hidden sm:block">ENCRYPTION: AES-256 // ACCESS: GRANTED</span>
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 rounded hover:bg-cyan-600/40 transition-all font-bold text-xs uppercase tracking-widest"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
