import Echo from 'laravel-echo';
var echoConfig = () => {
  return new Echo({
    broadcaster: 'socket.io',
    host: 'localhost:6001',
  });
};

export default echoConfig;
