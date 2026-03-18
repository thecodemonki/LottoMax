import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MansionGame from './pages/MansionGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mansion" element={<MansionGame />} />
      </Routes>
    </Router>
  );
}

export default App;
