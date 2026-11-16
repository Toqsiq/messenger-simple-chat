import { usePageMeta } from './usePageMeta';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import Profile from './Profile';
import './App.css';

// --- Компонент самого ЧАТА ---
function Chat() {
  // 1. Состояние для сообщений (загружаем из localStorage)
  const [messages, setMessages] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('chat-history')) || [];
    return saved.filter(msg => typeof msg === 'object' && msg?.text);
  });
  usePageMeta('Чат', '💬');
  // 2. Состояние для поля ввода
  const [inputText, setInputText] = useState('');

  // 3. Сохраняем в localStorage при каждом изменении messages
  useEffect(() => {
    localStorage.setItem('chat-history', JSON.stringify(messages));
  }, [messages]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }; // <--- Закрыли scrollToBottom

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat-history');
  }; // <--- Закрыли clearChat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // 4. Функция отправки (бывший handleSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputText.trim();

    if (text === '') return;

    // Получаем имя из профиля
    const senderName = localStorage.getItem('profile-name') || 'Я';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let newMessages = [];

    // Если текст длиннее 600 символов, режем его на части
    if (text.length > 600) {
      // Разбиваем текст на слова, чтобы не рвать слова посередине
      const words = text.split(' ');
      let currentChunk = '';

      words.forEach(word => {
        // Если добавление слова превысит 600 символов, сохраняем текущий кусок и начинаем новый
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

      // Добавляем остаток текста
      if (currentChunk.trim()) {
        newMessages.push({
          text: currentChunk.trim(),
          sender: senderName,
          time: time
        });
      }
    } else {
      // Если текст короткий, создаем одно сообщение
      newMessages.push({
        text: text,
        sender: senderName,
        time: time
      });
    }

    // Добавляем все новые сообщения в общий массив
    setMessages([...messages, ...newMessages]);
    setInputText('');
  };




  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      {/* Контейнер для кнопки (невидимый, без фона) */}
      <div style={{ width: '100%', maxWidth: '450px', display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button
          onClick={clearChat}
          style={{
            padding: '6px 12px',
            backgroundColor: 'transparent', // Прозрачный фон
            color: 'var(--color-primary)',   // Синий цвет, как у иконок
            border: 'none',                  // Без рамки
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'} // Эффект при наведении
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Очистить чат
        </button>
      </div>

      {/* Сам чат (возвращаем ему класс для стилей) */}
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


// --- Компонент Главной страницы (заглушка) ---
function Home() {
  usePageMeta('Главная', '🏠'); // <--- ДОБАВЬ ВОТ ЭТУ СТРОКУ
  return <h2>Главная страница</h2>;
}

// --- Главный компонент приложения ---
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