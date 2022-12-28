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
        broadcaster: 'pusher',
        key: '7c34c103432b342343d3434',
        cluster: 'ap1',
        wsHost: 'localhost',
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        authorizer: (channel, options) => {
          return {
            authorize: (socketId, callback) => {
              app.$axios
                .post('http://localhost:8000/broadcasting/auth', {
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
