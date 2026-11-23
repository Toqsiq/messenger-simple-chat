import Chat from './components/Chat/Chat';
import ChatList from './components/ChatList/ChatList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="main-nav">
        <Link to="/">Главная</Link>
        <Link to="/chats">Чаты</Link>
        <Link to="/profile">Профиль</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatList />} /> { }
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
