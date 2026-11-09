import './App.css';

function App() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Добро пожаловать в Мессенджер!</h1>
      <p>Это стартовое меню на React.</p>
      <button
        onClick={() => alert('Кнопка работает!')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007AFF',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        Войти в чат
      </button>
    </div>
  );
}

export default App;