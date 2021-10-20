'use strict';

const Hapi = require('@hapi/hapi');
const websocket = require('./websockets')


const init = async () => {

    const server = Hapi.server({
        port: 8080,
       
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
    await server.register(require('./routes/routes'));
   
    await server.start();
    console.log('Server running on %s', server.info.uri);
    websocket.run();
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();