import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import ChatItem from '../ChatItem/ChatItem';
import './ChatList.css';


function ChatList() {
    usePageMeta('Чаты', '💬');


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
            isRead: true
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
                            name={chat.name}
                            lastMessage={chat.lastMessage}
                            time={chat.time}
                            isRead={chat.isRead}
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
        </div>
    );
}

export default ChatList;
