import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { ClassroomView } from './pages/ClassroomView';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <Landing onEnterApp={() => setShowLanding(false)} />;
  }

  return <ClassroomView />;
}
