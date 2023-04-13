import Echo from 'laravel-echo';
import Socketio from 'socket.io-client';
// const WebEcho = () => {
//   window.Pusher = require('pusher-js');
//   window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'd50b12da7c3c5c8ef0da', // same key used in the pusher key
//     wsHost: '127.0.0.1', // host when you deploy would be your domain
//     cluster: 'mt1',
//     wsPort: 6001, // same port
//     forceTLS: false, // force https to false
//     disableStats: true, // don't send stats to pusher because we aren't using pusher
//   });
// };
// export default WebEcho;
const WebEcho = () => {
  // window.io = require('socket.io-client');
  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':' + '6001',
    key: '9251162f697d7b21d1ae8ad7ce346658',
    wsHost: '127.0.0.1',
    wsPort: 6001, // same port
    client: Socketio,
    transports: ['websocket'],
  });
};
export default WebEcho;
