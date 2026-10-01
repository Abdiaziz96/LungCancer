import React from 'react';
import { Flame, Activity, ArrowRightLeft, Wifi, WifiOff } from 'lucide-react';

interface SidebarStatusIndicatorProps {
  heatmapEnabled: boolean;
  isPaused: boolean;
  forcePageSync: boolean;
  isOnline: boolean;
  durationSeconds: number;
}

export const SidebarStatusIndicator: React.FC<SidebarStatusIndicatorProps> = ({
  heatmapEnabled,
  isPaused,
  forcePageSync,
  isOnline,
  durationSeconds,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-1.5">
      {/* Heatmap status */}
      <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition ${
        heatmapEnabled
          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
          : 'bg-slate-800/50 text-slate-500 border border-slate-800'
      }`}>
        <Flame className={`w-3 h-3 ${
          heatmapEnabled ? 'text-rose-400' : 'text-slate-600'
        }`} />
        <span>Heatmap {heatmapEnabled ? 'On' : 'Off'}</span>
      </div>

      {/* Session status */}
      <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border ${
        isPaused
          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
      }`}>
        <Activity className="w-3 h-3" />
        <span>{isPaused ? 'Paused' : 'Live'} · {formatTime(durationSeconds)}</span>
      </div>

      {/* Sync status */}
      <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border ${
        forcePageSync
          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
          : 'bg-slate-800/50 text-slate-500 border-slate-800'
      }`}>
        <ArrowRightLeft className="w-3 h-3" />
        <span>Sync {forcePageSync ? 'Locked' : 'Free'}</span>
      </div>

      {/* Online status */}
      <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border ${
        isOnline
          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
          : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
      }`}>
        {isOnline ? (
          <Wifi className="w-3 h-3 text-emerald-400" />
        ) : (
          <WifiOff className="w-3 h-3 text-amber-400" />
        )}
        <span>{isOnline ? 'Connected' : 'Offline'}</span>
      </div>
    </div>
  );
};
