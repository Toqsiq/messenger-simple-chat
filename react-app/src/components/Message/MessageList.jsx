function MessageList({ messages, messagesEndRef, onDeleteMessage }) {
    return (
        <div className="messages-list">
            {messages.map((message) => (
                <div className="message-bubble" key={message.id}>
                    <div className="message-info">
                        <span className="sender">{message.sender}</span>
                        <span className="time">{message.time}</span>
                    </div>
                    <div className="message-text">{message.text}</div>

                    { }
                    <button
                        className="delete-msg-btn"
                        onClick={() => onDeleteMessage(message.id)}
                        title="Удалить сообщение"
                    >
                        ✕
                    </button>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;

