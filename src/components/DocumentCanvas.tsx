import React, { useState } from 'react';
import { 
  Highlighter, 
  HelpCircle, 
  MessageSquarePlus, 
  Sparkles, 
  Flame, 
  Eye, 
  Check, 
  Share2, 
  CornerDownRight,
  BookOpen
} from 'lucide-react';
import { DocumentParagraph, LessonPage, UserRole } from '../types';

interface DocumentCanvasProps {
  page: LessonPage | undefined;
  currentPageNumber: number;
  totalPages: number;
  userRole: UserRole;
  heatmapEnabled: boolean;
  studentModeActiveTool: 'highlight' | 'confusion' | 'read';
  onParagraphAction: (paragraphId: string, action: 'highlight' | 'confusion' | 'question') => void;
  onSelectConfusion: (paragraph: DocumentParagraph) => void;
  currentStudentId: string;
  currentStudentName: string;
}

export const DocumentCanvas: React.FC<DocumentCanvasProps> = ({
  page,
  currentPageNumber,
  totalPages,
  userRole,
  heatmapEnabled,
  studentModeActiveTool,
  onParagraphAction,
  onSelectConfusion,
  currentStudentId,
  currentStudentName,
}) => {
  const [hoveredParagraphId, setHoveredParagraphId] = useState<string | null>(null);

  if (!page) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0F172A]">
        <div className="text-center text-slate-400 max-w-sm">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-200">Page Content Unavailable</h3>
          <p className="text-xs text-slate-500 mt-1">This page is an outline placeholder. Navigate to Page 1, 2, or 3 for interactive text content.</p>
        </div>
      </div>
    );
  }

  // Calculate heatmap background intensity based on confusion count
  const getHeatmapStyle = (confusionCount: number) => {
    if (!heatmapEnabled) return '';
    if (confusionCount >= 4) {
      return 'bg-rose-950/40 border-l-4 border-l-rose-500 shadow-lg shadow-rose-950/30';
    }
    if (confusionCount >= 2) {
      return 'bg-rose-950/25 border-l-4 border-l-rose-500/70';
    }
    if (confusionCount === 1) {
      return 'bg-rose-950/15 border-l-2 border-l-rose-400/50';
    }
    return '';
  };

  return (
    <main 
      id="center-document-canvas" 
      className="flex-1 w-full min-w-0 overflow-y-auto bg-[#0B1120] p-2 sm:p-6 lg:p-8 pb-28 sm:pb-8 flex justify-center selection:bg-amber-400/30 selection:text-amber-100 relative"
    >
      {/* Teacher Heatmap active banner */}
      {userRole === 'teacher' && heatmapEnabled && (
        <div 
          id="heatmap-floating-indicator"
          className="fixed top-16 sm:top-20 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/50 text-rose-300 text-xs font-medium shadow-xl backdrop-blur-md"
        >
          <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Confusion Heatmap Active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
        </div>
      )}

      {/* Main Document Paper / Page Card */}
      <div 
        id="document-page-card"
        className="w-full max-w-3xl bg-[#0F172A] border border-slate-800/90 rounded-xl sm:rounded-2xl shadow-2xl p-3.5 sm:p-10 lg:p-12 text-slate-200 relative flex flex-col min-h-[700px] sm:min-h-[840px]"
      >
        {/* Document Running Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 mb-4 sm:mb-8 text-xs text-slate-400">
          <span className="font-mono uppercase tracking-wider text-[10px] sm:text-[11px] text-indigo-400 font-semibold truncate max-w-[200px]">
            {page.chapterTitle}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium whitespace-nowrap ml-2">
            P. {currentPageNumber} of {totalPages}
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1 block">
            Core Reading Analysis
          </span>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 tracking-tight font-serif leading-snug">
            {page.sectionTitle}
          </h2>
        </div>

        {/* Document Paragraphs Flow */}
        <div className="space-y-4 sm:space-y-6 text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
          {page.paragraphs.map((p) => {
            const isHovered = hoveredParagraphId === p.id;
            const hasHighlights = p.highlightCount > 0;
            const hasConfusions = p.confusionCount > 0;
            const heatmapClass = getHeatmapStyle(p.confusionCount);

            return (
              <div
                key={p.id}
                id={`doc-paragraph-${p.id}`}
                onClick={() => {
                  if (userRole === 'student') {
                    if (studentModeActiveTool === 'highlight') {
                      onParagraphAction(p.id, 'highlight');
                    } else if (studentModeActiveTool === 'confusion') {
                      onParagraphAction(p.id, 'confusion');
                    } else {
                      setHoveredParagraphId(hoveredParagraphId === p.id ? null : p.id);
                    }
                  } else {
                    setHoveredParagraphId(hoveredParagraphId === p.id ? null : p.id);
                  }
                }}
                onMouseEnter={() => setHoveredParagraphId(p.id)}
                onMouseLeave={() => setHoveredParagraphId(null)}
                className={`relative group transition-all duration-200 rounded-xl p-3 sm:p-4 cursor-pointer sm:cursor-default ${
                  // Highlighted yellow paragraph style
                  hasHighlights
                    ? 'bg-amber-400/10 border-l-4 border-amber-400 text-slate-100'
                    : 'hover:bg-slate-800/40 border border-transparent'
                } ${heatmapClass}`}
              >
                {/* Paragraph Content based on Type */}
                {p.type === 'heading' && (
                  <h3 className="text-sm sm:text-lg font-bold text-slate-100 font-serif mb-2 tracking-tight">
                    {p.text}
                  </h3>
                )}

                {p.type === 'body' && (
                  <p className="text-slate-300 font-normal leading-[1.65] text-[13.5px] sm:text-base">
                    {p.text}
                  </p>
                )}

                {p.type === 'quote' && (
                  <blockquote className="border-l-2 border-indigo-500/60 pl-3 sm:pl-4 py-1 italic font-serif text-slate-200 text-xs sm:text-base">
                    {p.text}
                    {p.secondaryText && (
                      <cite className="block text-[10px] sm:text-xs font-sans not-italic text-slate-400 mt-1.5 font-medium">
                        {p.secondaryText}
                      </cite>
                    )}
                  </blockquote>
                )}

                {p.type === 'callout' && (
                  <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
                    {p.text}
                  </div>
                )}

                {/* Badges and Indicators on Left or Right Margin */}
                <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {/* Highlight Yellow Tag */}
                  {hasHighlights && (
                    <span 
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-amber-400/20 text-amber-300 border border-amber-400/30"
                      title={`${p.highlightCount} readers highlighted this paragraph in yellow/amber`}
                    >
                      <Highlighter className="w-3 h-3 text-amber-400" />
                      <span>{p.highlightCount} {p.highlightCount === 1 ? 'Highlight' : 'Highlights'}</span>
                    </span>
                  )}

                  {/* Red Confusion Asterisk (*) Pin */}
                  {hasConfusions && (
                    <button
                      id={`confusion-pin-${p.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectConfusion(p);
                      }}
                      className="group/pin inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition cursor-pointer shadow-sm shadow-rose-950"
                      title="Click to inspect students flagging confusion on this text"
                    >
                      <span className="text-sm font-black leading-none text-rose-400 group-hover/pin:scale-125 transition-transform">*</span>
                      <span>{p.confusionCount} Confused</span>
                      {userRole === 'teacher' && (
                        <span className="text-[10px] text-rose-400/80 underline ml-0.5">Inspect</span>
                      )}
                    </button>
                  )}

                  {/* Mobile Quick Action Buttons (Always visible or easily tapped on mobile) */}
                  <div className="flex sm:hidden items-center gap-1 ml-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onParagraphAction(p.id, 'highlight');
                      }}
                      className={`p-1.5 rounded-lg border text-[10px] font-semibold flex items-center gap-1 transition ${
                        hasHighlights 
                          ? 'bg-amber-400/20 border-amber-400/40 text-amber-300' 
                          : 'bg-slate-800/80 border-slate-700 text-slate-300'
                      }`}
                      title="Toggle highlight"
                    >
                      <Highlighter className="w-3 h-3 text-amber-400" />
                      <span>Highlight</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (userRole === 'teacher' && hasConfusions) {
                          onSelectConfusion(p);
                        } else {
                          onParagraphAction(p.id, 'confusion');
                        }
                      }}
                      className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-rose-500/20 text-[10px] font-semibold text-slate-300 flex items-center gap-1 transition"
                      title="Mark confusion"
                    >
                      <span className="text-xs font-black text-rose-400 leading-none">*</span>
                      <span>Confused</span>
                    </button>
                  </div>
                </div>

                {/* Desktop Interactive Action Toolbar on Hover */}
                <div
                  className={`hidden sm:flex absolute right-2 -top-3 z-10 items-center gap-1 bg-slate-800/95 border border-slate-700/90 rounded-lg p-1 shadow-xl transition-all duration-150 ${
                    isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'
                  }`}
                >
                  {/* Amber Highlight Action */}
                  <button
                    id={`action-highlight-${p.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onParagraphAction(p.id, 'highlight');
                    }}
                    className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition ${
                      hasHighlights 
                        ? 'bg-amber-400/30 text-amber-300' 
                        : 'text-slate-300 hover:text-amber-300 hover:bg-amber-500/20'
                    }`}
                    title={hasHighlights ? 'Remove Amber Highlight' : 'Highlight in Amber'}
                  >
                    <Highlighter className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px]">Highlight</span>
                  </button>

                  {/* Red Asterisk Confusion Pin Action */}
                  <button
                    id={`action-confusion-${p.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (userRole === 'teacher' && hasConfusions) {
                        onSelectConfusion(p);
                      } else {
                        onParagraphAction(p.id, 'confusion');
                      }
                    }}
                    className="p-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-rose-500/20 flex items-center gap-1 transition"
                    title="Mark confusion with red asterisk (*)"
                  >
                    <span className="text-sm font-black leading-none text-rose-400">*</span>
                    <span className="text-[11px]">
                      {userRole === 'teacher' && hasConfusions ? 'Review (*)' : 'Confused (*)'}
                    </span>
                  </button>

                  {/* Ask Question on Block */}
                  <button
                    id={`action-question-${p.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onParagraphAction(p.id, 'question');
                    }}
                    className="p-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-indigo-300 hover:bg-indigo-500/20 flex items-center gap-1 transition"
                    title="Ask a question about this paragraph"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[11px]">Ask Q&A</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formal Document Page Footer */}
        <div className="mt-auto pt-10 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Document Synced • ISO 216 Standard</span>
          </div>
          <div className="font-mono text-slate-400">
            Page {currentPageNumber} of {totalPages}
          </div>
        </div>
      </div>
    </main>
  );
};
