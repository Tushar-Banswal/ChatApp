
const socket = io('http://localhost:3000');

const form = document.querySelector('#sendMessage');
const message = document.querySelector('#messageInp');
const msgContainer = document.querySelector('.message-cont')

const userName = prompt("Enter your name: ");
socket.emit('newUserAdd', userName);

const joined = (name) => {
    const container = document.createElement('p');
    container.innerText = name + " joined the chat";
    container.classList.add('joined');
    msgContainer.appendChild(container);
}

const append = (message, position) => {
    const container = document.createElement('p');
    container.innerText = message;
    container.classList.add('msg');
    container.classList.add(position);
    msgContainer.appendChild(container);
}

const left = (name)=>{
    const container = document.createElement('p');
    container.innerText = name + " left the chat";
    container.classList.add('joined');
    msgContainer.appendChild(container);
}

socket.on('userJoined', (name) => {
    joined(name);
})

socket.on('receive', (data) => {
    const msg = data.message;
    const sender = data.name;
    append(`${sender}: ${msg}`, 'left');
}) 

socket.on('left', (name) => {
    left(name);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = message.value;
    append(`You: ${msg}`, 'right');
    socket.emit('send', msg);
    message.value = "";
})