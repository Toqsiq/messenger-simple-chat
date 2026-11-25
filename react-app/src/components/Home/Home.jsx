import { Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import './Home.css'; 

function Home() {
    usePageMeta('Главная', '🏠');
    return (
        <div className="home-container">
            <h2>Добро пожаловать в Мессенджер!</h2>
            <Link to="/chats" className="btn-go-to-chats">
                Перейти к чатам
            </Link>
        </div>
    );
}

export default Home;
