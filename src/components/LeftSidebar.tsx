import React from 'react';
import { 
  BookOpen, 
  Plus, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Sparkles,
  Layers,
  Flame,
  Users
} from 'lucide-react';
import { Lesson, UserRole } from '../types';

interface LeftSidebarProps {
  lessons: Lesson[];
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  onOpenAddLesson: () => void;
  userRole: UserRole;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  lessons,
  activeLessonId,
  onSelectLesson,
  onOpenAddLesson,
  userRole,
  isCollapsed,
  onToggleCollapse,
  isMobileDrawer = false,
  onCloseMobile,
}) => {
  return (
    <aside
      id="left-sidebar"
      className={`${
        isMobileDrawer
          ? 'w-full h-full border-r-0'
          : 'h-[calc(100vh-4rem)] border-r border-slate-800'
      } bg-slate-900/95 backdrop-blur-md transition-all duration-300 flex flex-col flex-shrink-0 z-20 ${
        isCollapsed && !isMobileDrawer ? 'w-16' : 'w-72 sm:w-80 lg:w-72'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        {(!isCollapsed || isMobileDrawer) && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Course Syllabus
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Interactive Reading Units</p>
          </div>
        )}

        {/* Close button for mobile drawer */}
        {isMobileDrawer && onCloseMobile ? (
          <button
            id="close-mobile-sidebar-btn"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition ml-auto min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close syllabus drawer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          /* Collapse toggle for desktop */
          <button
            id="toggle-sidebar-btn"
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition mx-auto hidden lg:block"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Lesson List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {lessons.map((lesson) => {
          const isActive = lesson.id === activeLessonId;
          return (
            <div
              key={lesson.id}
              id={`lesson-card-${lesson.id}`}
              onClick={() => {
                onSelectLesson(lesson.id);
                if (isMobileDrawer && onCloseMobile) onCloseMobile();
              }}
              className={`group relative rounded-xl p-3 cursor-pointer transition-all border ${
                isActive
                  ? 'bg-slate-800/90 border-indigo-500/50 shadow-md shadow-indigo-950/40 text-white'
                  : 'bg-slate-800/30 hover:bg-slate-800/60 border-slate-800/80 text-slate-300'
              }`}
            >
              {isCollapsed && !isMobileDrawer ? (
                <div className="flex flex-col items-center py-1 gap-1" title={`${lesson.title} (${isActive ? 'Active' : 'Idle'})`}>
                  <BookOpen className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold leading-snug line-clamp-1 group-hover:text-indigo-300 transition">
                      {lesson.title}
                    </span>
                    {isActive ? (
                      <span 
                        id={`active-badge-${lesson.id}`}
                        className="flex-shrink-0 px-2 py-0.5 text-[10px] font-bold bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-md"
                      >
                        [Active]
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">{lesson.totalPages}p</span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2 font-normal">
                    {lesson.subtitle}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1 border-t border-slate-700/40">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3 text-slate-400" />
                      {lesson.totalPages} pages
                    </span>

                    {lesson.totalConfusions > 0 && (
                      <span className="flex items-center gap-1 text-rose-400 font-medium">
                        <span className="font-bold">*</span>
                        {lesson.totalConfusions} confusion pins
                      </span>
                    )}

                    {isActive && lesson.activeStudentsCount > 0 && (
                      <span className="flex items-center gap-1 text-emerald-400 ml-auto font-medium">
                        <Users className="w-3 h-3" />
                        {lesson.activeStudentsCount}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Lesson Button at Bottom */}
      <div className={`p-3 border-t border-slate-800 bg-slate-900/60 ${isMobileDrawer ? 'pb-24 sm:pb-4' : ''}`}>
        <button
          id="add-lesson-btn"
          onClick={() => {
            onOpenAddLesson();
            if (isMobileDrawer && onCloseMobile) onCloseMobile();
          }}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 hover:border-indigo-500/50 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-indigo-300 transition-all min-h-[42px] ${
            isCollapsed && !isMobileDrawer ? 'p-2' : ''
          }`}
          title="Add new reading unit"
        >
          <Plus className="w-4 h-4 text-indigo-400" />
          {(!isCollapsed || isMobileDrawer) && <span>+ Add Lesson</span>}
        </button>
      </div>
    </aside>
  );
};
