import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import MessageList from '../Message/MessageList';
import MessageForm from '../Message/MessageForm';
import { usePageMeta } from '../../hooks/usePageMeta';

function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function Chat() {
    const { id } = useParams();

    const [senderName] = useState(() => localStorage.getItem('profile-name') || 'Я');
    const [chatName, setChatName] = useState('');
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);


    const [messages, setMessages] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('chat-history')) || [];
        return saved.filter(msg => msg.chatId === id || !msg.chatId);
    });


    useEffect(() => {
        const chats = JSON.parse(localStorage.getItem('chat-list')) || [];
        const currentChat = chats.find(c => c.id === id);
        if (currentChat) {
            setChatName(currentChat.name);
        }
    }, [id]);

    usePageMeta(chatName || 'Чат', '💬');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };


    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('chat-history')) || [];

        const otherMessages = saved.filter(msg => msg.chatId && msg.chatId !== id);

        const currentMessages = messages.map(msg => ({ ...msg, chatId: id }));

        const updatedHistory = [...otherMessages, ...currentMessages];
        localStorage.setItem('chat-history', JSON.stringify(updatedHistory));

        scrollToBottom();
    }, [messages, id]);


    const clearChat = () => {
        if (window.confirm('Очистить все сообщения в этом чате?')) {
            const history = JSON.parse(localStorage.getItem('chat-history')) || [];
            const updatedHistory = history.filter(msg => msg.chatId !== id);
            localStorage.setItem('chat-history', JSON.stringify(updatedHistory));
            setMessages([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = inputText.trim();
        if (text === '') return;

        const time = getCurrentTime();
        let newMessages = [];


        if (text.length > 600) {
            const words = text.split(' ');
            let currentChunk = '';

            words.forEach(word => {
                if ((currentChunk + word).length > 600) {
                    newMessages.push({
                        id: crypto.randomUUID(),
                        chatId: id,
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
                    id: crypto.randomUUID(),
                    chatId: id,
                    text: currentChunk.trim(),
                    sender: senderName,
                    time: time
                });
            }
        } else {
            newMessages.push({
                id: crypto.randomUUID(),
                chatId: id,
                text: text,
                sender: senderName,
                time: time
            });
        }

        setMessages([...messages, ...newMessages]);
        const savedChats = JSON.parse(localStorage.getItem('chat-list')) || [];
        const lastMsg = newMessages[newMessages.length - 1]; 

        const updatedChats = savedChats.map(chat => {
            if (chat.id === id) {
                return { ...chat, lastMessage: lastMsg.text, time: lastMsg.time };
            }
            return chat;
        });

        localStorage.setItem('chat-list', JSON.stringify(updatedChats));
        setInputText('');
    };

    return (
        <div className="chat-container">
            <div className="clear-btn-container">
                <button onClick={clearChat} className="clear-btn">
                    Очистить чат
                </button>
            </div>

            <div className="chat-wrapper">
                { }
                <div style={{ padding: '15px', borderBottom: '1px solid var(--text-light-gray)', fontWeight: 'bold', fontSize: '18px', color: 'var(--text-main)' }}>
                    {chatName || 'Чат'}
                </div>

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

export default Chat;
