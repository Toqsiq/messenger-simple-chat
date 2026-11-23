import { Link } from 'react-router-dom';
import './ChatItem.css';

function ChatItem({ avatar, name, lastMessage, time, isRead }) {
    return (
        <Link to="/chat" className="chat-item-link"> {/* <--- Обернули в Link */}
            <div className="chat-item">
                <div className="chat-item-avatar">
                    {avatar ? <img src={avatar} alt={name} /> : <span>{name[0]}</span>}
                </div>
                <div className="chat-item-content">
                    <div className="chat-item-header">
                        <span className="chat-item-name">{name}</span>
                        <span className="chat-item-time">{time}</span>
                    </div>
                    <div className="chat-item-footer">
                        <span className="chat-item-last-message">{lastMessage}</span>
                        {isRead && <span className="chat-item-check">✓✓</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ChatItem;
