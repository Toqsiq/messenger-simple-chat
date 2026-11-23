import './Header.css';

function Header({ title, onSearchClick, searchQuery, setSearchQuery, isSearchOpen }) {
    return (
        <header className="chat-header">
            <button className="header-btn burger-btn">
                <span className="material-icons">menu</span>
            </button>

            {isSearchOpen ? (
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="header-search-input"
                    autoFocus
                />
            ) : (
                <h1 className="header-title">{title}</h1>
            )}

            <button className="header-btn search-btn" onClick={onSearchClick}>
                <span className="material-icons">{isSearchOpen ? 'close' : 'search'}</span>
            </button>
        </header>
    );
}

export default Header;
