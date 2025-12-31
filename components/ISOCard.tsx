
import React from 'react';
import { ISOStandard } from '../types';

interface ISOCardProps {
  standard: ISOStandard;
  onClick: (standard: ISOStandard) => void;
}

const ISOCard: React.FC<ISOCardProps> = ({ standard, onClick }) => {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'High': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Foundational': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div 
      onClick={() => onClick(standard)}
      className="group relative bg-slate-900/40 border border-white/5 rounded p-3 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/5 cursor-pointer flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-1">
        <span className="mono text-[10px] font-bold text-cyan-400 opacity-80">
          #{standard.number}
        </span>
        <div className={`w-1 h-1 rounded-full ${standard.importance === 'Critical' ? 'bg-rose-500 animate-pulse' : 'bg-cyan-500'}`}></div>
      </div>
      
      <h3 className="text-xs font-bold text-slate-200 group-hover:text-white leading-tight mb-2 uppercase tracking-wide">
        {standard.title}
      </h3>
      
      <p className="text-[10px] text-slate-500 leading-tight line-clamp-2 italic mb-3">
        {standard.shortDescription}
      </p>

      <div className="mt-auto flex items-center space-x-2">
        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 border rounded ${getImportanceColor(standard.importance)}`}>
          {standard.importance.substring(0, 4)}
        </span>
        <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-cyan-500/20 transition-all"></div>
      </div>
    </div>
  );
};

export default ISOCard;
