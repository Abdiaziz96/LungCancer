import React, { useState } from 'react';
import { 
  Highlighter, 
  HelpCircle, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  UserCheck, 
  LogIn, 
  Sparkles, 
  Check, 
  Filter, 
  ArrowUpRight,
  BookMarked,
  LogOut
} from 'lucide-react';
import { QAQuestion, StudentUser } from '../types';

interface StudentPanelProps {
  currentStudent: StudentUser | null;
  onSignIn: (name: string) => void;
  onSignOut: () => void;
  activeTool: 'highlight' | 'confusion' | 'read';
  onSelectTool: (tool: 'highlight' | 'confusion' | 'read') => void;
  questions: QAQuestion[];
  onUpvoteQuestion: (questionId: string) => void;
  onAskQuestion: (text: string) => void;
  currentPageNumber: number;
  myHighlightsCount: number;
  myConfusionsCount: number;
  broadcastMessage?: string;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export const StudentPanel: React.FC<StudentPanelProps> = ({
  currentStudent,
  onSignIn,
  onSignOut,
  activeTool,
  onSelectTool,
  questions,
  onUpvoteQuestion,
  onAskQuestion,
  currentPageNumber,
  myHighlightsCount,
  myConfusionsCount,
  broadcastMessage,
  isMobileDrawer = false,
  onCloseMobile,
}) => {
  const [customName, setCustomName] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [qaFilter, setQaFilter] = useState<'all' | 'page'>('page');

  // Quick preset student profiles for rapid prototyping and testing
  const PRESET_STUDENTS = [
    { name: 'Alex Rivera', role: 'Cognitive Science Major' },
    { name: 'Elena Chen', role: 'Philosophy Student' },
    { name: 'Jordan Vance', role: 'HCI Researcher' },
    { name: 'Sofia Rodriguez', role: 'Learning Sciences' },
  ];

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onSignIn(customName.trim());
    setCustomName('');
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    onAskQuestion(newQuestionText.trim());
    setNewQuestionText('');
  };

  const filteredQuestions = questions.filter((q) => {
    if (qaFilter === 'page') return q.pageNumber === currentPageNumber;
    return true;
  });

  return (
    <div 
      id="student-right-panel"
      className={`${
        isMobileDrawer
          ? 'w-full h-full'
          : 'h-[calc(100vh-4rem)] w-80 lg:w-96 border-l border-slate-800'
      } bg-slate-900/95 backdrop-blur-md flex flex-col flex-shrink-0 overflow-y-auto text-slate-100 relative`}
    >
      {/* 1. Student Sign-In Overlay State if not signed in */}
      {!currentStudent ? (
        <div 
          id="student-signin-overlay"
          className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md p-6 flex flex-col justify-center animate-fade-in"
        >
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 mx-auto">
              <LogIn className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-center text-white mb-1">Student Seminar Sign-In</h3>
            <p className="text-xs text-center text-slate-400 mb-5">
              Connect to the live interactive reading session to highlight paragraphs and pin confusion markers.
            </p>

            {/* Presets */}
            <div className="mb-4">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">Quick Join as:</span>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_STUDENTS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onSignIn(preset.name)}
                    className="p-2 text-left rounded-xl bg-slate-800 hover:bg-indigo-600/20 hover:border-indigo-500/50 border border-slate-700 text-xs transition group"
                  >
                    <div className="font-semibold text-slate-200 group-hover:text-indigo-300">{preset.name}</div>
                    <div className="text-[10px] text-slate-400">{preset.role}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Name Input */}
            <form onSubmit={handleSignInSubmit} className="space-y-3">
              <div>
                <input
                  id="student-name-input"
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Or enter your full name..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <button
                type="submit"
                id="join-session-btn"
                disabled={!customName.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
              >
                Join Reading Session
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {/* Top Header for Student View */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentStudent && (
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
              style={{ backgroundColor: currentStudent.avatarColor }}
            >
              {currentStudent.name.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-xs font-bold text-slate-200 truncate max-w-[140px]">
              {currentStudent ? currentStudent.name : 'Student Mode'}
            </h2>
            <p className="text-[10px] text-emerald-400 font-medium">Session Active</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentStudent && (
            <button
              id="switch-student-btn"
              onClick={onSignOut}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 hover:bg-slate-800 px-2 py-1 rounded-lg transition"
              title="Sign in with different name"
            >
              <LogOut className="w-3 h-3" />
              Switch
            </button>
          )}

          {isMobileDrawer && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Close panel"
            >
              <LogOut className="w-4 h-4 rotate-180" />
            </button>
          )}
        </div>
      </div>

      <div className={`flex-1 flex flex-col p-4 space-y-4 overflow-y-auto ${isMobileDrawer ? 'pb-28' : ''}`}>
        {/* Broadcast notice from teacher (if present) */}
        {broadcastMessage && (
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-3 text-xs text-indigo-200 flex items-start gap-2 shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-indigo-300 block mb-0.5">Teacher Announcement:</span>
              <p className="text-slate-300 leading-snug">{broadcastMessage}</p>
            </div>
          </div>
        )}

        {/* Section 2: Interactive Annotation Tools */}
        <div 
          id="student-annotation-tools"
          className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Interactive Reading Tools
            </span>
            <span className="text-[10px] text-slate-400">Click to arm</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {/* Amber Highlighter Tool */}
            <button
              id="tool-highlight-btn"
              onClick={() => onSelectTool('highlight')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                activeTool === 'highlight'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-950'
                  : 'bg-slate-900/60 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title="Highlight passages in Amber"
            >
              <Highlighter className="w-4 h-4 text-amber-400 mb-1" />
              <span className="text-[11px] font-semibold">Highlight</span>
              <span className="text-[9px] text-amber-400/80 font-normal">Amber</span>
            </button>

            {/* Red Confusion Asterisk Tool */}
            <button
              id="tool-confusion-btn"
              onClick={() => onSelectTool('confusion')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                activeTool === 'confusion'
                  ? 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md shadow-rose-950'
                  : 'bg-slate-900/60 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title="Pin a red confusion asterisk (*)"
            >
              <span className="text-base font-black text-rose-400 leading-none mb-0.5">*</span>
              <span className="text-[11px] font-semibold">Confusion</span>
              <span className="text-[9px] text-rose-400/80 font-normal">Red Pin</span>
            </button>

            {/* Read Mode Tool */}
            <button
              id="tool-read-btn"
              onClick={() => onSelectTool('read')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                activeTool === 'read'
                  ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 shadow-md shadow-indigo-950'
                  : 'bg-slate-900/60 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title="Clean reading mode"
            >
              <BookMarked className="w-4 h-4 text-indigo-400 mb-1" />
              <span className="text-[11px] font-semibold">Read</span>
              <span className="text-[9px] text-indigo-400/80 font-normal">Normal</span>
            </button>
          </div>

          {/* Quick stats on page */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/70 rounded-xl p-2.5 border border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {myHighlightsCount} Highlights on P.{currentPageNumber}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-rose-400 font-bold">*</span>
              {myConfusionsCount} Confusions
            </span>
          </div>

          <p className="text-[10px] text-slate-400 mt-2 text-center">
            Tip: Hover any text on the canvas to highlight or pin an asterisk directly!
          </p>
        </div>

        {/* Section 3: Bottom Q&A Upvoting Panel */}
        <div 
          id="student-qa-panel"
          className="flex-1 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 shadow-sm flex flex-col min-h-[300px]"
        >
          {/* Q&A Header with Filter */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Seminar Q&A Stream
              </span>
            </div>

            <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700 text-[10px]">
              <button
                id="filter-qa-page-btn"
                onClick={() => setQaFilter('page')}
                className={`px-2 py-0.5 rounded-md font-medium transition ${
                  qaFilter === 'page' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Page {currentPageNumber}
              </button>
              <button
                id="filter-qa-all-btn"
                onClick={() => setQaFilter('all')}
                className={`px-2 py-0.5 rounded-md font-medium transition ${
                  qaFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
            </div>
          </div>

          {/* Questions Stream */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-60 mb-3">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No questions asked on Page {currentPageNumber} yet. Be the first to start the discussion below!
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isUpvotedByMe = currentStudent && q.upvotedBy.includes(currentStudent.id);
                return (
                  <div
                    key={q.id}
                    id={`qa-card-${q.id}`}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 space-y-2 hover:border-slate-700 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
                          style={{ backgroundColor: q.avatarColor }}
                        >
                          {q.studentName.charAt(0)}
                        </div>
                        <span className="font-semibold text-indigo-300 text-[11px]">{q.studentName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">P.{q.pageNumber}</span>
                      </div>

                      {/* Upvote Button with Counter */}
                      <button
                        id={`upvote-btn-${q.id}`}
                        onClick={() => onUpvoteQuestion(q.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition border ${
                          isUpvotedByMe
                            ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                            : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                        }`}
                        title="Upvote this question"
                      >
                        <ThumbsUp className={`w-3 h-3 ${isUpvotedByMe ? 'fill-indigo-400 text-indigo-400' : ''}`} />
                        <span>{q.upvotes}</span>
                      </button>
                    </div>

                    <p className="text-slate-200 leading-normal">{q.text}</p>

                    {/* Teacher's response badge if answered */}
                    {q.isAnswered && q.teacherResponse && (
                      <div className="mt-1.5 p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-300">
                        <span className="font-bold text-emerald-400 block mb-0.5">Teacher Response:</span>
                        {q.teacherResponse}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Ask a Question Input */}
          <form onSubmit={handlePostQuestion} className="mt-auto pt-2 border-t border-slate-700/60 flex gap-2">
            <input
              id="ask-question-input"
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder={`Ask a question on Page ${currentPageNumber}...`}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              type="submit"
              id="submit-question-btn"
              disabled={!newQuestionText.trim()}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold transition flex items-center gap-1 shadow-md shadow-indigo-600/25"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
