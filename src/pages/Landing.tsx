import React, { useState, useEffect } from 'react';
import { BookOpen, Highlighter, MessageSquare, Users, ArrowRight, Sparkles, Layers, SlidersHorizontal, Download } from 'lucide-react';
const h = React.createElement;
export var Landing = function(props) {
  var onEnterApp = props.onEnterApp;
  var [loaded, setLoaded] = useState(false);
  useEffect(function() { var t = setTimeout(function() { setLoaded(true); }, 300); return function() { clearTimeout(t); }; }, []);
  return h('div', { className: 'min-h-screen bg-[#080605] text-[#E8DFD5] overflow-x-hidden font-sans' },
    h('nav', { className: 'fixed top-0 left-0 right-0 z-50 bg-[#080605]/85 backdrop-blur-md border-b border-[#1F1915]' },
      h('div', { className: 'max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between' },
        h('div', { className: 'flex items-center gap-2.5' },
          h('div', { className: 'w-7 h-7 rounded-lg bg-[#1F1915] border border-[#3A322A] flex items-center justify-center' }, h(BookOpen, { className: 'w-3.5 h-3.5 text-[#CCA572]' })),
          h('span', { className: 'font-semibold text-sm tracking-tight text-[#FAF6EE]' }, 'Read', h('span', { className: 'text-[#CCA572]' }, 'Along'))),
        h('div', { className: 'flex items-center gap-3' },
          [['#features', 'Features'], ['#how-it-works', 'How It Works'], ['#for-students', 'For Students']].map(function(a) { return h('a', { key: a[0], href: a[0], className: 'hidden sm:inline text-xs text-[#9E9182] hover:text-[#EDE5DC] transition' }, a[1]); }),
          h('button', { onClick: onEnterApp, className: 'flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#CCA572] hover:bg-[#B89260] text-[#16120C] text-xs font-bold transition shadow-lg shadow-[#CCA572]/10' },
            h('span', null, 'Enter App'), h(ArrowRight, { className: 'w-3 h-3' }))))),
    h('section', { className: 'relative pt-28 pb-16 sm:pt-36 sm:pb-20 px-4 sm:px-6' },
      h('div', { className: 'max-w-5xl mx-auto relative text-center' },
        h('p', { className: 'text-lg sm:text-xl md:text-2xl text-[#CCA572] tracking-wide mb-5' }, 'Bismillah al-Rahman al-Rahim'),
        h('h1', { className: 'text-4xl sm:text-5xl md:text-6xl font-bold text-[#FAF6EE] leading-tight tracking-tight' }, 'Read ', h('span', { className: 'text-[#CCA572]' }, 'Together')),
        h('p', { className: 'text-lg sm:text-xl md:text-2xl text-[#9E9182] mt-2' }, 'Collaborative reading for circles of knowledge'),
        h('p', { className: 'text-sm sm:text-base text-[#7D7164] mt-4 max-w-2xl mx-auto leading-relaxed' }, 'ReadAlong brings teachers and students to the same page.'),
        h('div', { className: 'flex flex-wrap justify-center gap-3 mt-7' },
          h('button', { onClick: onEnterApp, className: 'flex items-center gap-2 px-6 py-3 rounded-xl bg-[#CCA572] hover:bg-[#B89260] text-[#16120C] font-bold text-sm transition shadow-lg shadow-[#CCA572]/15' },
            h(BookOpen, { className: 'w-4 h-4' }), h('span', null, 'Try ReadAlong'), h(ArrowRight, { className: 'w-4 h-4' })),
          h('a', { href: '#how-it-works', className: 'flex items-center gap-2 px-5 py-3 rounded-xl border border-[#3A322A] hover:border-[#CCA572]/50 text-[#9E9182] hover:text-[#EDE5DC] font-medium text-sm transition' },
            h(Sparkles, { className: 'w-3.5 h-3.5' }), h('span', null, 'See how it works'))))));
};