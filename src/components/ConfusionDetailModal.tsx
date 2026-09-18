import React, { useState } from 'react';
import { X, AlertCircle, MessageSquare, CheckCircle, Sparkles, Send } from 'lucide-react';
import { DocumentParagraph, UserRole } from '../types';

interface ConfusionDetailModalProps {
  paragraph: DocumentParagraph | null;
  onClose: () => void;
  userRole: UserRole;
  currentStudentName: string;
  onAddConfusionNote?: (paragraphId: string, comment: string) => void;
  onResolveConfusion?: (paragraphId: string) => void;
}

export const ConfusionDetailModal: React.FC<ConfusionDetailModalProps> = ({
  paragraph,
  onClose,
  userRole,
  currentStudentName,
  onAddConfusionNote,
  onResolveConfusion,
}) => {
  const [commentText, setCommentText] = useState('');

  if (!paragraph) return null;

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !onAddConfusionNote) return;
    onAddConfusionNote(paragraph.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        id="confusion-detail-modal"
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-rose-500/30 p-4 sm:p-6 shadow-2xl text-slate-100 relative"
      >
        <button
          id="close-confusion-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <span className="text-xl font-black leading-none">*</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">Confusion Pin Analysis</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                {paragraph.confusionCount} Flagged
              </span>
            </div>
            <p className="text-xs text-slate-400">Active friction on page {paragraph.pageNumber}</p>
          </div>
        </div>

        {/* Paragraph snippet */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 mb-4 text-xs text-slate-300 leading-relaxed font-serif italic border-l-4 border-l-rose-500">
          "{paragraph.text.length > 220 ? paragraph.text.slice(0, 220) + '...' : paragraph.text}"
        </div>

        {/* List of student notes */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
              Student Explanations ({paragraph.confusionNotes.length})
            </span>
            {userRole === 'teacher' && onResolveConfusion && (
              <button
                id="teacher-resolve-btn"
                onClick={() => {
                  onResolveConfusion(paragraph.id);
                  onClose();
                }}
                className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-lg transition"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Resolve All on This Block
              </button>
            )}
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
            {paragraph.confusionNotes.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400 bg-slate-800/40 rounded-xl border border-slate-800">
                <AlertCircle className="w-5 h-5 mx-auto mb-1 text-slate-500" />
                Students pinned confusion asterisks without attaching specific notes.
              </div>
            ) : (
              paragraph.confusionNotes.map((note, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-indigo-300">{note.studentName}</span>
                    <span className="text-[10px] text-slate-400">{note.timestamp}</span>
                  </div>
                  <p className="text-slate-200 leading-normal">{note.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add note input (for students or teacher) */}
        {userRole === 'student' && onAddConfusionNote && (
          <form onSubmit={handlePostNote} className="flex gap-2">
            <input
              id="student-confusion-note-input"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Explain why this concept is unclear..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
            />
            <button
              type="submit"
              id="submit-confusion-note-btn"
              disabled={!commentText.trim()}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-rose-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              Pin
            </button>
          </form>
        )}

        {userRole === 'teacher' && (
          <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-indigo-200">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-indigo-300">Pedagogical Recommendation:</strong> Multiple students struggle with the distinction between scaffolding and offloading. Consider asking a guiding question before reading the next section.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
