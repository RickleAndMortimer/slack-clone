let socket = io();

let content = document.getElementById('content');

let messages = document.getElementById('messages');
let sendButton = document.getElementById('send-button');
let messagebar = document.getElementById('messagebar');
let messagefield = document.getElementById('messagefield');

let user = document.getElementById('username');
let signin = document.getElementById('signin');

let username = '';

content.style.background = 'white';
content.style.filter = 'blur(8px)';
messagefield.style.pointerEvents = 'none';
sendButton.style.pointerEvents = 'none';

function makeMessageHTML(username, msg) {
    let item = document.createElement('li');
    let time = new Date();
    item.innerHTML = `
    			<p class="x">${time.toLocaleTimeString('en-US')}</p>
      			<p><b class="user"> ${username} </b>${msg}</p>
    			`;
    return item;
}

signin.addEventListener('submit', e => {
    e.preventDefault();
    username = user.value;
    signin.remove();
    content.style.filter = 'blur(0px)';
    messagefield.style.pointerEvents = 'auto';
    sendButton.style.pointerEvents = 'auto';
    fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        body: JSON.stringify({
            'username': username
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        response.json()
    }).then((data) => {
        console.log(data);
    });
});

messagebar.addEventListener('submit', function(e) {
    e.preventDefault();
    if (messagefield.value && username) {
        socket.emit('chat message', {username: username, message: messagefield.value});
        messagefield.value = '';
    }
});

socket.on('chat message', function(msg) {
    let item = makeMessageHTML(msg.username, msg.message);
    messages.appendChild(item);
    messages.scrollTo(0, messages.scrollHeight);
});


