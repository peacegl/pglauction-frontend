import {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Echo from 'laravel-echo';

const EchoContext = createContext();

export const useEcho = () => useContext(EchoContext);

const EchoProvider = ({children}) => {
  const [echo, setEcho] = useState();
  useEffect(() => {
    window.Pusher = require('pusher-js');
    setEcho(
      new Echo({
        app_id: '1548163',
        broadcaster: 'pusher',
        key: 'd50b12da7c3c5c8ef0da',
        cluster: 'mt1',
        wsHost: '127.0.0.1',
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        authorizer: (channel, options) => {
          return {
            authorize: (socketId, callback) => {
              app.$axios
                .post('http://127.0.0.1:8000/broadcasting/auth', {
                  socket_id: socketId,
                  channel_name: channel.name,
                })
                .then((response) => {
                  callback(false, response.data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
        //// server
        // broadcaster: "pusher",
        // key: "pfP8Yz8L5rR04D57OzTUoYldNLe16yzOApSAcRXA",
        // cluster: "KHyxTSf1cQik1oalRBtA6eofaRQ9Bic5bXlgvYAomKQ",
        // wsHost: "clientbackend.oredoh.org",
        // wsPort: 6001,
        // wssPort: 443,
        // authorizer: (channel, options) => {
        //   return {
        //     authorize: (socketId, callback) => {
        //       app.$axios
        //         .post("https://clientbackend.oredoh.org/broadcasting/auth", {
        //           socket_id: socketId,
        //           channel_name: channel.name,
        //         })
        //         .then((response) => {
        //           callback(false, response.data);
        //         })
        //         .catch((error) => {
        //           callback(true, error);
        //         });
        //     },
        //   };
        // },
      }),
    );
    console.log(echo);
  }, []);

  return (
    <EchoContext.Provider
      value={{
        ...echo,
      }}
    >
      {children}
    </EchoContext.Provider>
  );
};
export default EchoProvider;

EchoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
