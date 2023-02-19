import Echo from 'laravel-echo';

const WebEcho = () => {
  window.Pusher = require('pusher-js');
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'd50b12da7c3c5c8ef0da', // same key used in the pusher key
    wsHost: '127.0.0.1', // host when you deploy would be your domain
    cluster: 'mt1',
    wsPort: 6001, // same port
    forceTLS: false, // force https to false
    disableStats: true, // don't send stats to pusher because we aren't using pusher
  });
};
export default WebEcho;
