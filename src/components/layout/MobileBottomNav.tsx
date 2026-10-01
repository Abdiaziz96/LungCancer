import React from 'react';
import { Layers, BookOpen, SlidersHorizontal, MessageSquare } from 'lucide-react';
import type { MobileActiveTab } from '../../types/workspace';

interface MobileBottomNavProps {
  mobileActiveTab: MobileActiveTab;
  onSelectMobileTab: (tab: MobileActiveTab) => void;
  userRole: 'teacher' | 'student';
  currentPage: number;
  unreadQuestionCount: number;
  activeConfusionCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  mobileActiveTab,
  onSelectMobileTab,
  userRole,
  currentPage,
  unreadQuestionCount,
  activeConfusionCount,
}) => {
  return (
    <nav
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 h-14 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md px-3 flex items-center justify-around shadow-2xl"
    >
      {/* Tab 1: Syllabus */}
      <button
        id="mobile-nav-syllabus"
        onClick={() => onSelectMobileTab(mobileActiveTab === 'sidebar' ? 'document' : 'sidebar')}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition ${
          mobileActiveTab === 'sidebar'
            ? 'text-indigo-400 font-semibold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Layers className="w-4 h-4" />
        <span className="text-[10px] mt-0.5">Syllabus</span>
      </button>

      {/* Tab 2: Document (Page Reading) */}
      <button
        id="mobile-nav-reading"
        onClick={() => onSelectMobileTab('document')}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition ${
          mobileActiveTab === 'document'
            ? 'text-indigo-400 font-semibold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <BookOpen className="w-4 h-4" />
        <span className="text-[10px] mt-0.5">Page {currentPage}</span>
      </button>

      {/* Tab 3: Panel (Teacher Controls / Student Q&A & Tools) */}
      <button
        id="mobile-nav-panel"
        onClick={() => onSelectMobileTab(mobileActiveTab === 'panel' ? 'document' : 'panel')}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl relative transition ${
          mobileActiveTab === 'panel'
            ? 'text-indigo-400 font-semibold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {userRole === 'teacher' ? (
          <SlidersHorizontal className="w-4 h-4" />
        ) : (
          <MessageSquare className="w-4 h-4" />
        )}
        <span className="text-[10px] mt-0.5">
          {userRole === 'teacher' ? 'Controls' : 'Tools & Q&A'}
        </span>

        {/* Badge */}
        {userRole === 'student' && unreadQuestionCount > 0 && (
          <span className="absolute top-1 right-6 w-3.5 h-3.5 bg-indigo-500 text-[8px] font-bold text-white rounded-full flex items-center justify-center">
            {unreadQuestionCount}
          </span>
        )}
        {userRole === 'teacher' && activeConfusionCount > 0 && (
          <span className="absolute top-1 right-6 w-3.5 h-3.5 bg-rose-500 text-[9px] font-black text-white rounded-full flex items-center justify-center animate-pulse">
            *
          </span>
        )}
      </button>
    </nav>
  );
};
