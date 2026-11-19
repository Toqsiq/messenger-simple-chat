import { usePageMeta } from '../../hooks/usePageMeta';

function Home() {
    usePageMeta('Главная', '🏠');
    return <h2>Главная страница</h2>;
}

export default Home;
