import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MansionGame from './pages/MansionGame';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <Router>
      <AudioPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mansion" element={<MansionGame />} />
      </Routes>
    </Router>
  );
}

export default App;
