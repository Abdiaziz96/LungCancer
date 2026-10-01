import React from 'react';
import { Highlighter, BookOpen } from 'lucide-react';

interface MobileFloatingToolBarProps {
  activeTool: 'highlight' | 'confusion' | 'read';
  onSelectTool: (tool: 'highlight' | 'confusion' | 'read') => void;
  showToast: (msg: string) => void;
}

export const MobileFloatingToolBar: React.FC<MobileFloatingToolBarProps> = ({
  activeTool,
  onSelectTool,
  showToast,
}) => {
  return (
    <div
      id="mobile-floating-tool-bar"
      className="lg:hidden fixed bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/95 border border-slate-700/90 shadow-2xl backdrop-blur-lg"
    >
      <button
        onClick={() => {
          onSelectTool('highlight');
          showToast('Highlight tool active: Tap any paragraph');
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
          activeTool === 'highlight'
            ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <Highlighter className="w-3.5 h-3.5 text-amber-500" />
        <span>Highlight</span>
      </button>

      <button
        onClick={() => {
          onSelectTool('confusion');
          showToast('Confusion pin tool active: Tap any paragraph');
        }}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
          activeTool === 'confusion'
            ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <span className="text-sm font-black leading-none text-rose-300">*</span>
        <span>Confused</span>
      </button>

      <button
        onClick={() => onSelectTool('read')}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
          activeTool === 'read'
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>Read</span>
      </button>
    </div>
  );
};
