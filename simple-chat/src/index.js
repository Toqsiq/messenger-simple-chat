import './index.css';
const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const messagesList = document.getElementById('chat-messages');
let savedMessages = [];

function initState() {
    savedMessages = JSON.parse(localStorage.getItem('chat-history')) || [];

    // Защита от старых или битых данных
    savedMessages = savedMessages.filter(function (message) {
        // Оставляем только те сообщения, которые являются объектами и имеют текст
        return typeof message === 'object' && message !== null && message.text;
    });
    form.addEventListener('submit', handleSubmit);
    loadHistory(savedMessages, messagesList);
}

function createMessageBubble(message, messagesContainer) { // <--- добавили параметр
    const newBubble = document.createElement('div');
    newBubble.classList.add('message-bubble');

    newBubble.innerHTML = `
    <div class="message-info">
      <span class="sender">${message.sender}</span>
      <span class="time">${message.time}</span>
    </div>
    <div class="message-text">${message.text}</div>
  `;

    messagesContainer.appendChild(newBubble); // <--- заменили messagesList на messagesContainer
}


function loadHistory(messages, container) {
    messages.forEach(function (message) {
        createMessageBubble(message, container);
    });
    scrollToBottom(container); // <--- заменили
}

function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}



function handleSubmit(event) {
    event.preventDefault();

    const text = input.value.trim();
    if (text === '') return;

    // НОВАЯ ПРОВЕРКА:
    if (text.length > 200) {
        alert('Сообщение слишком длинное! Максимум 200 символов.');
        return;
    }

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
    createMessageBubble(newMessage, messagesList);

    // Сохраняем объект в массив и в localStorage
    savedMessages.push(newMessage);
    localStorage.setItem('chat-history', JSON.stringify(savedMessages));

    input.value = '';
    scrollToBottom(messagesList);
}


initState();