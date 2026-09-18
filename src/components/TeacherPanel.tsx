import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Flame, 
  Copy, 
  Check, 
  Users, 
  QrCode, 
  Send, 
  ArrowRightLeft, 
  ShieldCheck, 
  Activity, 
  AlertCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { SessionState, StudentUser } from '../types';

interface TeacherPanelProps {
  sessionState: SessionState;
  onTogglePlayPause: () => void;
  onToggleHeatmap: () => void;
  onToggleForceSync: () => void;
  onForceSyncToCurrentPage: () => void;
  onBroadcastMessage: (msg: string) => void;
  students: StudentUser[];
  currentPageConfusionCount: number;
  currentPageNumber: number;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  sessionState,
  onTogglePlayPause,
  onToggleHeatmap,
  onToggleForceSync,
  onForceSyncToCurrentPage,
  onBroadcastMessage,
  students,
  currentPageConfusionCount,
  currentPageNumber,
  isMobileDrawer = false,
  onCloseMobile,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSentToast, setBroadcastSentToast] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sessionState.roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    onBroadcastMessage(broadcastText.trim());
    setBroadcastText('');
    setBroadcastSentToast(true);
    setTimeout(() => setBroadcastSentToast(false), 2500);
  };

  // Format elapsed time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      id="teacher-right-panel"
      className={`${
        isMobileDrawer
          ? 'w-full h-full'
          : 'h-[calc(100vh-4rem)] w-80 lg:w-96 border-l border-slate-800'
      } bg-slate-900/95 backdrop-blur-md flex flex-col flex-shrink-0 overflow-y-auto text-slate-100`}
    >
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Teacher Control Center
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 font-semibold">
            Host View
          </span>
          {isMobileDrawer && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className={`p-4 space-y-5 flex-1 ${isMobileDrawer ? 'pb-28' : ''}`}>
        {/* Section 1: Session Controls */}
        <div 
          id="teacher-session-controls"
          className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              Session Status
            </span>
            <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-md">
              {formatTime(sessionState.durationSeconds)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              id="session-pause-resume-btn"
              onClick={onTogglePlayPause}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition shadow-sm ${
                sessionState.isPaused
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  : 'bg-amber-600/80 hover:bg-amber-500 text-white shadow-amber-600/20'
              }`}
            >
              {sessionState.isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  Pause Session
                </>
              )}
            </button>

            <button
              id="force-sync-all-btn"
              onClick={onForceSyncToCurrentPage}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-700 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-medium border border-slate-600 transition shadow-sm"
              title={`Broadcast Page ${currentPageNumber} to all students`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              Force Page Sync
            </button>
          </div>

          {/* Force Sync lock switch */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/40 text-xs">
            <span className="text-slate-400">Lock Students to My Page</span>
            <button
              id="lock-students-toggle"
              onClick={onToggleForceSync}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                sessionState.forcePageSync ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  sessionState.forcePageSync ? 'translate-x-4' : 'translate-x-0'
                }`} 
              />
            </button>
          </div>
        </div>

        {/* Section 2: "Confusion Heatmap" Toggle Panel */}
        <div 
          id="teacher-heatmap-panel"
          className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${sessionState.heatmapEnabled ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-400'}`}>
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-200">Confusion Heatmap</h3>
                <p className="text-[10px] text-slate-400">Real-time friction overlay</p>
              </div>
            </div>

            <button
              id="heatmap-toggle-switch"
              onClick={onToggleHeatmap}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                sessionState.heatmapEnabled ? 'bg-rose-600' : 'bg-slate-700'
              }`}
              title="Toggle Confusion Heatmap visual overlay"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-md ${
                  sessionState.heatmapEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} 
              />
            </button>
          </div>

          <div className="mt-3 bg-slate-900/60 rounded-xl p-3 border border-slate-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-rose-400 leading-none">*</span>
              <span className="text-slate-300">Active on Page {currentPageNumber}:</span>
            </div>
            <span className="font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/30">
              {currentPageConfusionCount} pins
            </span>
          </div>
        </div>

        {/* Section 3: 6-Digit Room Code Invite Panel */}
        <div 
          id="teacher-room-invite-panel"
          className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">Room Code Invite</span>
            <span className="text-[10px] text-slate-400">6-Digit Key</span>
          </div>

          {/* Monospace Code Display */}
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 flex items-center justify-between mb-3">
            <span className="font-mono text-xl font-extrabold text-indigo-400 tracking-widest">
              {sessionState.roomCode}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                id="copy-code-panel-btn"
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copy room code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                id="view-qr-code-btn"
                onClick={() => setShowQR(true)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Show QR Code"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Invite Link notice */}
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Invite URL ready to share</span>
            <button 
              onClick={handleCopyCode}
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
            >
              {copiedCode ? 'Code Copied!' : 'Copy Invite Link'}
            </button>
          </div>
        </div>

        {/* Section 4: Live Student Roster & Presence */}
        <div 
          id="teacher-student-roster"
          className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Connected Students ({students.length})
            </span>
            <span className="text-[10px] text-emerald-400 font-medium">All Online</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {students.map((student) => (
              <div 
                key={student.id}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: student.avatarColor }}
                  >
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-200">{student.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    P.{student.currentPage}
                  </span>
                  {student.status === 'confused' && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" title="Flagged confusion on text" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Teacher Broadcast Announcement */}
        <div 
          id="teacher-broadcast-panel"
          className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm"
        >
          <span className="text-xs font-semibold text-slate-300 block mb-1.5">
            Broadcast Notice to Class
          </span>
          <form onSubmit={handleSendBroadcast} className="flex gap-2">
            <input
              id="broadcast-message-input"
              type="text"
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              placeholder="e.g. Focus on Section 1.3 before we begin..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              id="send-broadcast-btn"
              disabled={!broadcastText.trim()}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-medium transition flex items-center gap-1 shadow-md shadow-indigo-600/20"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
          {broadcastSentToast && (
            <p className="text-[10px] text-emerald-400 mt-1.5 flex items-center gap-1 animate-fade-in">
              <Check className="w-3 h-3" />
              Broadcast updated for all students
            </p>
          )}
        </div>
      </div>

      {/* QR Code Modal preview */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-xs w-full text-center relative shadow-2xl">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="text-sm font-bold text-white mb-1">Scan to Join Seminar</h4>
            <p className="text-xs text-slate-400 mb-4">Room Code: {sessionState.roomCode}</p>

            {/* Generated Mock QR visual */}
            <div className="bg-white p-4 rounded-xl inline-block shadow-inner mx-auto mb-4">
              <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                {/* QR corner 1 */}
                <rect x="10" y="10" width="24" height="24" fill="#0F172A" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" fill="#0F172A" />
                {/* QR corner 2 */}
                <rect x="66" y="10" width="24" height="24" fill="#0F172A" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" fill="#0F172A" />
                {/* QR corner 3 */}
                <rect x="10" y="66" width="24" height="24" fill="#0F172A" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" fill="#0F172A" />
                {/* Center matrix elements */}
                <rect x="42" y="14" width="8" height="8" fill="#0F172A" />
                <rect x="42" y="26" width="8" height="8" fill="#0F172A" />
                <rect x="54" y="20" width="6" height="6" fill="#0F172A" />
                <rect x="40" y="40" width="20" height="20" rx="3" fill="#6366F1" />
                <rect x="46" y="46" width="8" height="8" fill="white" />
                <rect x="66" y="45" width="8" height="8" fill="#0F172A" />
                <rect x="78" y="45" width="8" height="15" fill="#0F172A" />
                <rect x="42" y="66" width="8" height="8" fill="#0F172A" />
                <rect x="54" y="74" width="12" height="6" fill="#0F172A" />
                <rect x="70" y="70" width="16" height="16" fill="#0F172A" />
              </svg>
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
