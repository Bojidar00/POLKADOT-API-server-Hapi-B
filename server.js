'use strict';

const Hapi = require('@hapi/hapi');
const indexer = require('./modules/indexer');





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
    await server.register([
        require('inert'),
        require('vision'),
        {
          plugin: require('hapi-swaggered-ui'),
          options: {
            title: 'Example API',
            path: '/docs',
            authorization: { // see above
              field: 'apiKey',
              scope: 'query', // header works as well
              // valuePrefix: 'bearer '// prefix incase
              defaultValue: 'demoKey',
              placeholder: 'Enter your apiKey here',
              endpoint: "./swagger.json"
            },
            swaggerOptions: {
                
            } 
          }
        }
      ])
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