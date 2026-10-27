import './index.css';
const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const messagesList = document.getElementById('chat-messages');


let savedMessages = JSON.parse(localStorage.getItem('chat-history')) || [];

// Защита от старых или битых данных
savedMessages = savedMessages.filter(function (message) {
    // Оставляем только те сообщения, которые являются объектами и имеют текст
    return typeof message === 'object' && message !== null && message.text;
});


function createMessageBubble(message) {
    const newBubble = document.createElement('div');
    newBubble.classList.add('message-bubble');

    // Создаем HTML-структуру внутри пузыря: имя, текст и время
    newBubble.innerHTML = `
    <div class="message-info">
      <span class="sender">${message.sender}</span>
      <span class="time">${message.time}</span>
    </div>
    <div class="message-text">${message.text}</div>
  `;

    messagesList.appendChild(newBubble);
}


function loadHistory() {
    savedMessages.forEach(function (message) {
        createMessageBubble(message); // Передаем весь объект message
    });

    messagesList.scrollTop = messagesList.scrollHeight;
}


loadHistory();



function handleSubmit(event) {
    event.preventDefault();

    const text = input.value.trim();
    if (text === '') return;

    // Получаем текущее время в формате ЧЧ:ММ
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Создаем объект сообщения
    const newMessage = {
        text: text,
        sender: 'Я', // Пока пишем "Я", так как нет авторизации
        time: timeString
    };

    // Отправляем объект в функцию отрисовки
    createMessageBubble(newMessage);

    // Сохраняем объект в массив и в localStorage
    savedMessages.push(newMessage);
    localStorage.setItem('chat-history', JSON.stringify(savedMessages));

    input.value = '';
    messagesList.scrollTop = messagesList.scrollHeight;
}

form.addEventListener('submit', handleSubmit);