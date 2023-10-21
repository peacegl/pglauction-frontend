// import Echo from 'laravel-echo';
// import Socket from 'socket.io-client';
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

import Echo from 'laravel-echo';
import socketio from 'socket.io-client';

const echoWeb = new Echo({
  host: process.env.NEXT_PUBLIC_WEB_SOCKET_SERVER_URL,
  broadcaster: 'socket.io',
  client: socketio,
});

export default echoWeb;
