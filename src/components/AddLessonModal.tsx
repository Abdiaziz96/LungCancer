import React, { useState } from 'react';
import { X, BookPlus, Sparkles } from 'lucide-react';
import { Lesson } from '../types';

interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLesson: (lesson: Lesson) => void;
  currentLessonCount: number;
}

export const AddLessonModal: React.FC<AddLessonModalProps> = ({
  isOpen,
  onClose,
  onAddLesson,
  currentLessonCount,
}) => {
  const [title, setTitle] = useState(`Lesson ${currentLessonCount + 1}: Critical Inquiries`);
  const [subtitle, setSubtitle] = useState('Epistemic agency and shared cognitive artifacts');
  const [totalPages, setTotalPages] = useState(16);
  const [category, setCategory] = useState('Pedagogical Theory');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newLesson: Lesson = {
      id: `lesson_${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Collaborative text analysis',
      totalPages: Number(totalPages) || 12,
      currentPage: 1,
      category: category.trim() || 'General Studies',
      isActive: false,
      activeStudentsCount: 0,
      totalConfusions: 0,
      pages: [
        {
          pageNumber: 1,
          chapterTitle: `Chapter 1: ${title.trim()}`,
          sectionTitle: '1.1 Foundations & Primary Arguments',
          paragraphs: [
            {
              id: `p_new_1`,
              pageNumber: 1,
              type: 'heading',
              text: `1.1 Introduction: ${title.trim()}`,
              confusionCount: 0,
              highlightCount: 0,
              confusionNotes: [],
            },
            {
              id: `p_new_2`,
              pageNumber: 1,
              type: 'body',
              text: `This newly scheduled reading module investigates how contemporary collaborative annotation interfaces transform student cognitive synthesis. Please utilize the amber highlighter to tag salient arguments and red asterisks (*) to pinpoint points of confusion.`,
              confusionCount: 0,
              highlightCount: 1,
              confusionNotes: [],
            },
            {
              id: `p_new_3`,
              pageNumber: 1,
              type: 'callout',
              text: 'Discussion Goal: Identify the key structural assertions before the live seminar deconstruction.',
              confusionCount: 0,
              highlightCount: 0,
              confusionNotes: [],
            }
          ]
        }
      ]
    };

    onAddLesson(newLesson);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        id="add-lesson-modal"
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/80 p-4 sm:p-6 shadow-2xl text-slate-100 relative"
      >
        <button
          id="close-add-lesson-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <BookPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Create New Reading Unit</h3>
            <p className="text-xs text-slate-400">Add an interactive reading text to the curriculum</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Lesson Title</label>
            <input
              id="lesson-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="e.g. Lesson 5: Epistemic Responsibility"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Subtitle or Focus Question</label>
            <input
              id="lesson-subtitle-input"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="e.g. Investigating digital agency in seminar settings"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Discipline / Category</label>
              <select
                id="lesson-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="Cognitive Science">Cognitive Science</option>
                <option value="Information Ethics">Information Ethics</option>
                <option value="Pedagogical Theory">Pedagogical Theory</option>
                <option value="Literary Analysis">Literary Analysis</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Page Count</label>
              <input
                id="lesson-pages-input"
                type="number"
                min={1}
                max={100}
                value={totalPages}
                onChange={(e) => setTotalPages(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              id="cancel-lesson-btn"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-lesson-btn"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Add to Curriculum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
