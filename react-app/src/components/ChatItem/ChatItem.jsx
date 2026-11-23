import { Link } from 'react-router-dom';
import './ChatItem.css';

function ChatItem({ id, avatar, name, lastMessage, time, isRead, onDelete }) {
    return (
        <div className="chat-item-wrapper">
            <Link to={`/chat/${id}`} className="chat-item-link">
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
                            <span className={`chat-item-check ${isRead ? 'read' : ''}`}>✓✓</span>
                        </div>
                    </div>
                </div>
            </Link>

            { }
            <button className="delete-chat-btn" onClick={(e) => {
                e.preventDefault();
                onDelete(id);
            }}>
                <span className="material-icons">delete</span>
            </button>
        </div>
    );
}

export default ChatItem;
