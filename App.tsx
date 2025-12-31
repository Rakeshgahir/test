
import React, { useState, useMemo } from 'react';
import { CORE_STANDARDS } from './constants';
import { ISOStandard } from './types';
import ISOCard from './components/ISOCard';
import DetailModal from './components/DetailModal';
import { searchISODatabase } from './services/geminiService';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandard, setSelectedStandard] = useState<ISOStandard | null>(null);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const filteredCore = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return CORE_STANDARDS.filter(s => 
      s.number.toString().includes(q) || 
      s.title.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchISODatabase(searchQuery);
    setAiResults(results);
    setIsSearching(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 md:p-12 relative">
      {/* Corner Technical Readouts */}
      <div className="fixed top-6 left-6 mono text-[10px] text-cyan-500/40 hidden xl:block uppercase tracking-[0.3em] vertical-text">
        SYSTEM LOAD: OPTIMAL // ENCRYPTION: ACTIVE // 27K SERIES
      </div>
      <div className="fixed bottom-6 left-6 mono text-[10px] text-cyan-500/40 hidden xl:block uppercase tracking-[0.3em] vertical-text">
        LOG_STAMP: {new Date().toISOString().substring(0, 10)} // AUTH: GRANTED
      </div>

      {/* Poster Header */}
      <header className="mb-16 border-b border-cyan-500/20 pb-12 relative">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
                <div className="h-[1px] w-12 bg-cyan-500/50"></div>
                <span className="mono text-[10px] text-cyan-500 uppercase tracking-widest font-bold">Authorized Information Security Blueprint</span>
            </div>
            <h1 className="heading text-6xl md:text-8xl font-black text-white text-glow leading-none tracking-tighter uppercase mb-4">
              ISO/IEC <span className="text-cyan-500">27000</span>
            </h1>
            <p className="mono text-slate-500 text-xs md:text-sm uppercase tracking-[0.5em] font-medium">
              Unified Repository for Information Security Management Systems
            </p>
          </div>
          
          <div className="w-full md:w-[400px]">
            <form onSubmit={handleAISearch} className="relative group">
              <input 
                type="text"
                placeholder="SCAN DATABASE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-cyan-500/30 text-cyan-400 p-4 pl-12 mono text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {isSearching && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>}
            </form>
          </div>
        </div>
      </header>

      {/* The Poster Grid */}
      <main className="tech-border glass-blur p-8 rounded-lg overflow-hidden">
        {aiResults.length > 0 && (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
             <div className="flex items-center space-x-2 mb-4">
                <span className="w-2 h-2 bg-rose-500 animate-pulse"></span>
                <h3 className="mono text-xs font-bold text-rose-400 uppercase tracking-widest">Heuristic Matches Detected</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {aiResults.map((res, idx) => (
                 <div key={idx} onClick={() => setSelectedStandard({id: res.number, number: parseInt(res.number), title: res.title, category: 'AI', shortDescription: res.summary, importance: 'Medium'})}
                   className="bg-rose-500/5 border border-rose-500/20 p-4 rounded hover:bg-rose-500/10 cursor-pointer transition-all group"
                 >
                    <span className="mono text-[10px] text-rose-400 font-bold block mb-1">NODE_{res.number}</span>
                    <h4 className="text-white font-bold text-sm group-hover:text-rose-400">{res.title}</h4>
                 </div>
               ))}
             </div>
             <button onClick={() => setAiResults([])} className="mt-4 text-[9px] mono text-slate-500 hover:text-white uppercase tracking-widest">[ PURGE CACHE ]</button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredCore.map(standard => (
            <ISOCard 
              key={standard.id} 
              standard={standard} 
              onClick={setSelectedStandard}
            />
          ))}
        </div>

        {filteredCore.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="mono text-slate-600 uppercase tracking-[0.5em] text-xl">System Empty // No Node Match</h2>
          </div>
        )}
      </main>

      {/* Poster Footer with Developer Credit */}
      <footer className="mt-16 flex flex-col md:flex-row justify-between items-center border-t border-cyan-500/20 pt-8 gap-8">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col">
            <span className="mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">Index Range</span>
            <span className="text-xl font-black text-white tracking-tighter">27000 — 27701</span>
          </div>
          <div className="h-10 w-[1px] bg-cyan-500/20 hidden md:block"></div>
          <div className="flex flex-col">
            <span className="mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">Global Standard</span>
            <span className="text-xl font-black text-white tracking-tighter uppercase">ISMS // PIMS</span>
          </div>
        </div>

        <div className="relative group text-right">
          <div className="absolute -inset-1 bg-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-black/60 border border-cyan-500/40 p-4 rounded-sm flex items-center space-x-6">
            <div className="text-right">
              <p className="mono text-[8px] text-cyan-500 uppercase tracking-[0.3em] mb-1 font-bold">Authorized Developer Signature</p>
              <h4 className="heading text-xl text-white font-black tracking-widest uppercase">Rakesh Gahir</h4>
            </div>
            <div className="w-12 h-12 border-2 border-cyan-500/30 rounded-full flex items-center justify-center">
              <span className="text-cyan-500 font-black text-xs">RG</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Details Hologram Modal */}
      <DetailModal 
        standard={selectedStandard} 
        onClose={() => setSelectedStandard(null)} 
      />
    </div>
  );
};

export default App;
