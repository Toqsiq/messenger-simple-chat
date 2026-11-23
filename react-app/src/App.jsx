import Chat from './components/Chat/Chat';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import './App.css';
import Home from './components/Home/Home';






function App() {
  return (
    <BrowserRouter>
      <nav className="main-nav">
        <Link to="/">Главная</Link>
        <Link to="/chat">Чат</Link>
        <Link to="/profile">Профиль</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
