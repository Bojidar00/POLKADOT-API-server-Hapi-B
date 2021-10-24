'use strict';

const Hapi = require('@hapi/hapi');
const indexer = require('./modules/indexer');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



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
    server.route({
        method: 'GET',
        path: '/swagger',
        handler: (request, h) => {
            swaggerUi.setup(swaggerDocument);
            return swaggerUi.serve();
        }
    });
    await server.register(require('./routes/routes'));
   
    await server.start();
    console.log('Server running on %s', server.info.uri);
   
    require('./websockets');
    indexer.run();
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();