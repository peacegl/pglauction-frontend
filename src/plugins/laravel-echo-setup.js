import Echo from 'laravel-echo';
window.io = require('socket.io-client');

var echoConfig = new Echo({
  broadcaster: 'socket.io',
  host: 'localhost:6001',
});

export default echoConfig;
