import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios'

 const useEcho = ()=>{
 window.Pusher = Pusher;
 const token  = localStorage.getItem('token')
  window.echo = new Echo({
    broadcaster: 'reverb',
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_WEB_SOCKET_SERVER_URL,
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
    wssPort: 8080,
    encrypted: true,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post(process.env.NEXT_PUBLIC_WEB_SOCKET_SERVER_URL+'/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                },
              {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
               },
              }
                )
                .then(response => {
                    callback(false, response.data);
                })
                .catch(error => {
                    callback(true, error);
                });
            }
        };
    },
});
 }
export default useEcho
