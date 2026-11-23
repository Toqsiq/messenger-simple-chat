import './Header.css';

function Header({ title }) {
    return (
        <header className="chat-header">
            <button className="header-btn burger-btn">
                <span className="material-icons">menu</span>
            </button>

            <h1 className="header-title">{title}</h1>

            <button className="header-btn search-btn">
                <span className="material-icons">search</span>
            </button>
        </header>
    );
}

export default Header;
