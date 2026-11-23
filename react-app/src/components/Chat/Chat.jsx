import { useState, useEffect, useRef } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import MessageList from '../Message/MessageList';
import MessageForm from '../Message/MessageForm';


function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

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

        const time = getCurrentTime();
        let newMessages = [];

        if (text.length > 600) {
            const words = text.split(' ');
            let currentChunk = '';

            words.forEach(word => {
                if ((currentChunk + word).length > 600) {
                    newMessages.push({
                        id: crypto.randomUUID(),
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
                    text: currentChunk.trim(),
                    sender: senderName,
                    time: time
                });
            }
        } else {
            newMessages.push({
                id: crypto.randomUUID(),
                text: text,
                sender: senderName,
                time: time
            });
        }

        setMessages([...messages, ...newMessages]);
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
