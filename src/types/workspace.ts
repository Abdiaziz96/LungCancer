// ============================================================================
// Workspace Types — Explicit TypeScript interfaces for all state handlers
// ============================================================================

import type {
  Lesson,
  StudentUser,
  DocumentParagraph,
  QAQuestion,
  SessionState,
} from '../types';

// ─── Page Navigation ─────────────────────────────────────────────────────────

export interface PageNavigationHandlers {
  onPageChange: (newPage: number) => void;
  onSyncWithTeacher?: () => void;
}

// ─── Lesson / Curriculum ─────────────────────────────────────────────────────

export interface LessonHandlers {
  onSelectLesson: (lessonId: string) => void;
  onAddLesson: (lesson: Lesson) => void;
  onOpenAddLesson: () => void;
}

// ─── Session Controls (Teacher) ──────────────────────────────────────────────

export interface SessionControlHandlers {
  onTogglePlayPause: () => void;
  onToggleHeatmap: () => void;
  onToggleForceSync: () => void;
  onForceSyncToCurrentPage: () => void;
  onBroadcastMessage: (msg: string) => void;
}

// ─── Document Paragraph Actions ──────────────────────────────────────────────

export type ParagraphAction = 'highlight' | 'confusion' | 'question';

export interface ParagraphActionHandlers {
  onParagraphAction: (paragraphId: string, action: ParagraphAction) => void;
  onSelectConfusion: (paragraph: DocumentParagraph) => void;
  onAddConfusionNote?: (paragraphId: string, comment: string) => void;
  onResolveConfusion?: (paragraphId: string) => void;
}

// ─── Student Identity ────────────────────────────────────────────────────────

export interface StudentIdentityHandlers {
  onSignIn: (name: string) => void;
  onSignOut: () => void;
}

export interface StudentToolState {
  activeTool: 'highlight' | 'confusion' | 'read';
  onSelectTool: (tool: 'highlight' | 'confusion' | 'read') => void;
}

// ─── Q&A ─────────────────────────────────────────────────────────────────────

export interface QAHandlers {
  onAskQuestion: (text: string) => void;
  onUpvoteQuestion: (questionId: string) => void;
}

// ─── Role Toggle ─────────────────────────────────────────────────────────────

export interface RoleToggleHandler {
  onToggleRole: () => void;
}

// ─── PWA & Online Status ─────────────────────────────────────────────────────

export interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onOpenPWAInstall: () => void;
  installPWA?: () => void;
}

export interface OnlineState {
  isOnline: boolean;
}

// ─── Toast Notification ──────────────────────────────────────────────────────

export interface ToastState {
  toastMessage: string | null;
}

// ─── Mobile Navigation ───────────────────────────────────────────────────────

export type MobileActiveTab = 'document' | 'sidebar' | 'panel';

export interface MobileNavigationState {
  mobileActiveTab: MobileActiveTab;
  onSelectMobileTab: (tab: MobileActiveTab) => void;
}

// ─── Complete App Context (compound dependency-injection shape) ──────────────

export interface AppContext {
  // User context
  userRole: 'teacher' | 'student';
  currentStudent: StudentUser | null;
  teacherPage: number;
  currentPage: number;

  // Lesson context
  activeLesson: Lesson;
  activeLessonId: string;
  lessons: Lesson[];

  // Session context
  sessionState: SessionState;
  students: StudentUser[];
  questions: QAQuestion[];

  // Computed
  currentPageConfusionCount: number;
  activeConfusionCount: number;
  unreadQuestionCount: number;
  myHighlightsCount: number;
  myConfusionsCount: number;

  // Handlers
  pageNavigation: PageNavigationHandlers;
  lesson: LessonHandlers;
  session: SessionControlHandlers;
  paragraph: ParagraphActionHandlers;
  studentIdentity: StudentIdentityHandlers;
  studentTool: StudentToolState;
  qa: QAHandlers;
  role: RoleToggleHandler;
  pwa: PWAState;
  online: OnlineState;
  mobile: MobileNavigationState;
}
