let socket = io();

let messages = document.getElementById('messages');
let messagebar = document.getElementById('messagebar');
let messagefield = document.getElementById('messagefield');
let userlistbutton = document.getElementById('userlistbutton')
let userlistcontainer = document.getElementById('userlistcontainer')

let user = document.getElementById('username');
let signin = document.getElementById('signin');

let username = '';
let userlistisopen = false;


function makeMessageHTML(username, msg) {
    let item = document.createElement('li');
    let time = new Date();
    item.innerHTML = `
    			<p class="x">${time.toLocaleTimeString('en-US')}</p>
      			<p><b class="user"> ${username} </b>${msg}</p>
    			`;
    return item;
}

userlistbutton.addEventListener('click', e => {
    if (userlistisopen) {
        console.log('user list is open');
        userlistcontainer.style.display = 'block';
        userlistisopen = false;
    }
    else {
        console.log('user list is closed');
        userlistcontainer.style.display = 'none';
        userlistisopen = true;
    }
});

signin.addEventListener('submit', e => {
    e.preventDefault();
    console.log('cat');
    username = user.value;
    console.log(username);
    signin.remove();
});


messagebar.addEventListener('submit', function(e) {
    e.preventDefault();
    if (messagefield.value) {
        socket.emit('chat message', {username: username, message: messagefield.value});
        messagefield.value = '';
    }
});

socket.on('chat message', function(msg) {
    let item = makeMessageHTML(msg.username, msg.message);
    messages.appendChild(item);
    messages.scrollTo(0, messages.scrollHeight);
});


