var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

function makeMessageHTML(username, msg) {
    var item = document.createElement('li');
    var time = new Date();
    item.innerHTML = `
    			<p class="x">${time.toLocaleTimeString('en-US')}</p>
      			<p><b class="user"> ${username} </b>${msg}</p>
    			`;
    return item;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = makeMessageHTML('fix', msg);
    messages.appendChild(item);
    messages.scrollTo(0, messages.scrollHeight);
});


