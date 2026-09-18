import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  User, 
  Download, 
  Copy, 
  Check, 
  Radio, 
  Wifi, 
  WifiOff, 
  Sparkles,
  Layers,
  ArrowRightLeft,
  Menu,
  SlidersHorizontal,
  MessageSquare,
  X
} from 'lucide-react';
import { UserRole } from '../types';

interface TopBarProps {
  lessonTitle: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  userRole: UserRole;
  onToggleRole: () => void;
  roomCode: string;
  isOnline: boolean;
  onOpenPWAInstall: () => void;
  isPWAInstallable: boolean;
  isPWAInstalled: boolean;
  studentName?: string;
  teacherPage: number;
  isTeacherSynced: boolean;
  onSyncWithTeacher?: () => void;
  mobileActiveTab?: 'document' | 'sidebar' | 'panel';
  onSelectMobileTab?: (tab: 'document' | 'sidebar' | 'panel') => void;
  unreadQuestionCount?: number;
  activeConfusionCount?: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  lessonTitle,
  currentPage,
  totalPages,
  onPageChange,
  userRole,
  onToggleRole,
  roomCode,
  isOnline,
  onOpenPWAInstall,
  isPWAInstallable,
  isPWAInstalled,
  studentName = 'Alex Rivera',
  teacherPage,
  isTeacherSynced,
  onSyncWithTeacher,
  mobileActiveTab = 'document',
  onSelectMobileTab,
  unreadQuestionCount = 0,
  activeConfusionCount = 0,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header 
      id="app-top-bar"
      className="h-14 sm:h-16 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md px-2.5 sm:px-6 flex items-center justify-between z-30 sticky top-0 flex-shrink-0"
    >
      {/* Left: Mobile syllabus toggle, brand logo & Lesson Title */}
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1 lg:flex-initial mr-1">
        {/* Mobile Hamburger to open Syllabus Drawer */}
        {onSelectMobileTab && (
          <button
            id="mobile-open-sidebar-btn"
            onClick={() => onSelectMobileTab(mobileActiveTab === 'sidebar' ? 'document' : 'sidebar')}
            className={`p-2 rounded-xl border transition flex lg:hidden items-center justify-center min-w-[38px] min-h-[38px] ${
              mobileActiveTab === 'sidebar'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
            aria-label="Toggle Syllabus Menu"
            title="Course Syllabus"
          >
            {mobileActiveTab === 'sidebar' ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        )}

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 block -mb-0.5">ReadSync</span>
            <span className="text-[10px] text-slate-400">Collaborative PWA</span>
          </div>
        </div>

        <div className="h-4 sm:h-5 w-px bg-slate-800 hidden md:block mx-1" />

        <div className="min-w-0 pr-1">
          <h1 
            id="current-lesson-title" 
            className="text-xs sm:text-sm font-semibold text-slate-100 truncate flex items-center gap-1.5"
          >
            <span className="truncate">{lessonTitle}</span>
            <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-normal text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Session
            </span>
          </h1>
        </div>
      </div>

      {/* Center: Page Navigation (Page 3/20) */}
      <div className="flex items-center gap-1 sm:gap-2 bg-slate-800/80 border border-slate-700/60 rounded-xl px-1.5 sm:px-2.5 py-1 shadow-sm flex-shrink-0 mx-1">
        <button
          id="prev-page-btn"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="p-1.5 sm:p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 disabled:opacity-30 disabled:hover:bg-transparent transition min-w-[32px] min-h-[32px] flex items-center justify-center"
          aria-label="Previous page"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 text-xs font-semibold text-slate-200 px-0.5 sm:px-1">
          <span className="text-slate-400 font-normal hidden sm:inline">Page</span>
          <span id="current-page-display" className="text-indigo-400 font-bold px-1.5 py-0.5 bg-indigo-500/10 rounded-md text-[11px] sm:text-xs">
            {currentPage}
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400 text-[11px] sm:text-xs">{totalPages}</span>
        </div>

        <button
          id="next-page-btn"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="p-1.5 sm:p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 disabled:opacity-30 disabled:hover:bg-transparent transition min-w-[32px] min-h-[32px] flex items-center justify-center"
          aria-label="Next page"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Sync with teacher alert if student is on another page */}
        {userRole === 'student' && !isTeacherSynced && onSyncWithTeacher && (
          <button
            id="sync-with-teacher-btn"
            onClick={onSyncWithTeacher}
            className="ml-1 hidden md:flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-2 py-0.5 rounded-md transition animate-pulse"
            title={`Teacher is on Page ${teacherPage}`}
          >
            <ArrowRightLeft className="w-3 h-3" />
            Sync P.{teacherPage}
          </button>
        )}
      </div>

      {/* Right: Room Code, PWA Install, View Switcher & Mobile Panel Trigger */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Room code badge (hidden on phone, visible on tablet/desktop) */}
        <button
          id="copy-room-code-btn"
          onClick={handleCopyRoomCode}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-mono text-slate-300 transition"
          title="Click to copy room invite code"
        >
          <span className="text-slate-500 text-[10px] uppercase font-sans font-semibold">Room</span>
          <span className="font-bold text-slate-100">{roomCode}</span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>

        {/* Online / Offline status */}
        <div 
          className="hidden 2xl:flex items-center gap-1 text-[11px] text-slate-400 px-2 py-1 rounded-lg bg-slate-800/50"
          title={isOnline ? 'Online - Real-time sync active' : 'Offline - Running from PWA cache'}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span>Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300">Offline PWA</span>
            </>
          )}
        </div>

        {/* PWA Install Button (hidden on phone to save space, phone users have prompt / modal) */}
        {!isPWAInstalled && (
          <button
            id="pwa-install-topbar-btn"
            onClick={onOpenPWAInstall}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition shadow-sm"
            title="Install as Progressive Web App"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">Install App</span>
          </button>
        )}

        {/* View Switcher Toggle (Teacher vs Student) */}
        <div 
          id="view-switcher-container"
          className="flex items-center bg-slate-950 p-0.5 sm:p-1 rounded-xl border border-slate-800 shadow-inner"
        >
          <button
            id="switch-to-teacher-btn"
            onClick={() => userRole !== 'teacher' && onToggleRole()}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all min-h-[32px] ${
              userRole === 'teacher'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="Switch to Teacher Mode"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Teacher</span>
          </button>

          <button
            id="switch-to-student-btn"
            onClick={() => userRole !== 'student' && onToggleRole()}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all min-h-[32px] ${
              userRole === 'student'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="Switch to Student Mode"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Student</span>
          </button>
        </div>

        {/* Mobile Right Drawer Button (Opens Teacher Session or Student Tools/Q&A) */}
        {onSelectMobileTab && (
          <button
            id="mobile-open-panel-btn"
            onClick={() => onSelectMobileTab(mobileActiveTab === 'panel' ? 'document' : 'panel')}
            className={`p-2 rounded-xl border transition lg:hidden flex items-center justify-center relative min-w-[38px] min-h-[38px] ${
              mobileActiveTab === 'panel'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
            aria-label={userRole === 'teacher' ? 'Toggle Teacher Controls' : 'Toggle Student Tools & Q&A'}
            title={userRole === 'teacher' ? 'Teacher Controls' : 'Student Tools & Q&A'}
          >
            {userRole === 'teacher' ? (
              <SlidersHorizontal className="w-4 h-4" />
            ) : (
              <MessageSquare className="w-4 h-4" />
            )}

            {/* Notification dot / badge */}
            {userRole === 'student' && unreadQuestionCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center border border-slate-900">
                {unreadQuestionCount}
              </span>
            )}
            {userRole === 'teacher' && activeConfusionCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center border border-slate-900 animate-pulse">
                *
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
