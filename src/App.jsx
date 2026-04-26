import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import MansionGame from './pages/MansionGame';
import AudioPlayer from './components/AudioPlayer';
import EntryPage from './components/EntryPage';
import GeneratingPage from './components/GeneratingPage';
function App() {
  const [appState, setAppState] = useState('entry'); // 'entry', 'generating', 'home'
  const [showAudio, setShowAudio] = useState(false);

  return (
    <Router>
      <AudioPlayer isVisible={showAudio} />
      <AnimatePresence mode="wait">
        {appState === 'entry' && (
          <EntryPage key="entry" onEnter={() => setAppState('generating')} />
        )}
        {appState === 'generating' && (
          <GeneratingPage key="generating" onComplete={() => setAppState('home')} />
        )}
        {appState === 'home' && (
          <Routes key="routes">
            <Route path="/" element={<Home setShowAudio={setShowAudio} />} />
            <Route path="/mansion" element={<MansionGame />} />
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
