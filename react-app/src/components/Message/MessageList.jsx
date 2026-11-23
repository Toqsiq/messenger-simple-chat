function MessageList({ messages, messagesEndRef }) {
    return (
        <div className="messages-list">
            {messages.map((message, index) => (
                <div className="message-bubble" key={index}>
                    <div className="message-info">
                        <span className="sender">{message.sender}</span>
                        <span className="time">{message.time}</span>
                    </div>
                    <div className="message-text">{message.text}</div>
                </div>
            ))}
            { }
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;


