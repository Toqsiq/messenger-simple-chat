import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import ChatItem from '../ChatItem/ChatItem';
import './ChatList.css';
import { Link } from 'react-router-dom';

function ChatList() {
    usePageMeta('Чаты', '💬');
    const handleDeleteChat = (chatId) => {
        if (window.confirm('Удалить этот чат полностью?')) {

            const updatedChats = chats.filter(c => c.id !== chatId);
            setChats(updatedChats);
            localStorage.setItem('chat-list', JSON.stringify(updatedChats));


            const history = JSON.parse(localStorage.getItem('chat-history')) || [];
            const updatedHistory = history.filter(msg => msg.chatId !== chatId);
            localStorage.setItem('chat-history', JSON.stringify(updatedHistory));
        }
    };


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [chats, setChats] = useState(() => {
        const saved = localStorage.getItem('chat-list');
        return saved ? JSON.parse(saved) : [];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newChatName, setNewChatName] = useState('');

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        localStorage.setItem('chat-list', JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        const saved = localStorage.getItem('chat-list');
        if (saved) {
            setChats(JSON.parse(saved));
        }
    }, []);
    const handleCreateChat = () => {
        if (!newChatName.trim()) return;

        const newChat = {
            id: crypto.randomUUID(),
            name: newChatName,
            lastMessage: 'Чат создан. Напишите первое сообщение!',
            time: 'Сейчас',
            isRead: false
        };

        setChats([newChat, ...chats]);
        setIsModalOpen(false);
        setNewChatName('');
    };

    const filteredChats = chats.filter(chat => {
        const query = searchQuery.toLowerCase();

        return chat.name.toLowerCase().includes(query) ||
            chat.lastMessage.toLowerCase().includes(query);
    });

    return (
        <div className="chat-list-container">
            <Header
                title="Чаты"
                onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSearchOpen={isSearchOpen}
                onMenuClick={() => setIsMenuOpen(true)}
            />

            <div className="chat-list-items">
                {chats.length === 0 ? (
                    <div className="empty-chats">
                        <p>У вас пока нет чатов.</p>
                        <p>Нажмите <strong>+</strong>, чтобы начать общение!</p>
                    </div>
                ) : (
                    filteredChats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            id={chat.id}
                            name={chat.name}
                            lastMessage={chat.lastMessage}
                            time={chat.time}
                            isRead={chat.isRead}
                            onDelete={handleDeleteChat}
                        />
                    ))
                )}
            </div>

            <button className="floating-btn" onClick={() => setIsModalOpen(true)} title="Создать чат">+</button>

            { }
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Новый чат</h2>
                        <input
                            type="text"
                            placeholder="Введите имя собеседника"
                            value={newChatName}
                            onChange={(e) => setNewChatName(e.target.value)}
                            className="profile-input"
                        />
                        <div className="modal-actions">
                            <button onClick={() => setIsModalOpen(false)} className="btn-cancel">Отмена</button>
                            <button onClick={handleCreateChat} className="btn-create">Создать</button>
                        </div>
                    </div>
                </div>
            )}
            { }
            {isMenuOpen && (
                <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}>
                    <div className="sidebar" onClick={(e) => e.stopPropagation()}>
                        <h3>Меню</h3>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link>
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Профиль</Link>
                        <button className="close-sidebar" onClick={() => setIsMenuOpen(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatList;
