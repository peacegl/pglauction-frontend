// import axios from 'axios';
// import Echo from 'laravel-echo';
// const broadcastAuthInstance = axios.create({
//   baseURL: 'http://localhost:8000/broadcasting/', // the auth route
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });
// const EchoConfig = () => {
//   window.Pusher = require('pusher-js');
//   broadcastAuthInstance.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('token')}`;
//   window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'd50b12da7c3c5c8ef0da', // same key used in the pusher key
//     wsHost: '127.0.0.1', // host when you deploy would be your domain
//     cluster: 'mt1',
//     wsPort: 6001, // same port
//     forceTLS: false, // force https to false
//     disableStats: true, // don't send stats to pusher because we aren't using pusher
//     authorizer: (channel, option) => {
//       return {
//         authorize: (socketId, callback) => {
//           broadcastAuthInstance
//             .post('auth', {
//               socket_id: socketId,
//               channel_name: channel.name,
//             })
//             .then((response) => {
//               callback(false, response.data);
//             })
//             .catch((error) => {
//               callback(true, error);
//             });
//         },
//       };
//     },
//   });
// };
// export default EchoConfig;

import Echo from 'laravel-echo';
const echoAuthInit = () => {
  const socketio = require('socket.io-client');
  window.echoAuth = new Echo({
    host: process.env.NEXT_PUBLIC_WEB_SOCKET_SERVER_URL,
    broadcaster: 'socket.io',
    client: socketio,
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem('token')}`,
      },
    },
  });
};

export default echoAuthInit;
