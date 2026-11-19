import { usePageMeta } from './usePageMeta';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import Profile from './Profile';
import './App.css';


function Chat() {

  const [senderName] = useState(() => localStorage.getItem('profile-name') || 'Я');

  const [messages, setMessages] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('chat-history')) || [];
    return saved.filter(msg => typeof msg === 'object' && msg?.text);
  });
  usePageMeta('Чат', '💬');

  const [inputText, setInputText] = useState('');


  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat-history');
  };


  useEffect(() => {
    localStorage.setItem('chat-history', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputText.trim();

    if (text === '') return;



    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let newMessages = [];


    if (text.length > 600) {

      const words = text.split(' ');
      let currentChunk = '';

      words.forEach(word => {

        if ((currentChunk + word).length > 600) {
          newMessages.push({
            text: currentChunk.trim(),
            sender: senderName,
            time: time
          });
          currentChunk = word + ' ';
        } else {
          currentChunk += word + ' ';
        }
      });


      if (currentChunk.trim()) {
        newMessages.push({
          text: currentChunk.trim(),
          sender: senderName,
          time: time
        });
      }
    } else {

      newMessages.push({
        text: text,
        sender: senderName,
        time: time
      });
    }


    setMessages([...messages, ...newMessages]);
    setInputText('');
  };




  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      { }
      <div style={{ width: '100%', maxWidth: '450px', display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button
          onClick={clearChat}
          style={{
            padding: '6px 12px',
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Очистить чат
        </button>
      </div>

      { }
      <div className="chat-wrapper">
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        <MessageForm
          inputText={inputText}
          setInputText={setInputText}
          onSubmit={handleSubmit}
        />
      </div>

    </div>
  );
}



function Home() {
  usePageMeta('Главная', '🏠');
  return <h2>Главная страница</h2>;
}


function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px', display: 'flex', gap: '20px', borderBottom: '1px solid #444' }}>
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