let socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

let user = document.getElementById('username');
let signin = document.getElementById('signin');

let username = '';

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
    console.log('cat');
    username = user.value;
    console.log(username);
    signin.remove();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {username: username, message: input.value});
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    let item = makeMessageHTML(msg.username, msg.message);
    messages.appendChild(item);
    messages.scrollTo(0, messages.scrollHeight);
});


