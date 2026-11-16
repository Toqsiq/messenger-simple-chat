function MessageForm({ inputText, setInputText, onSubmit }) {
    return (
        <form className="form" onSubmit={onSubmit}>
            <input
                className="form-input"
                type="text"
                placeholder="Введите сообщение"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}

            />
            <button type="submit" className="send-btn">
                <span className="material-icons">near_me</span>
            </button>
        </form>
    );
}

export default MessageForm;