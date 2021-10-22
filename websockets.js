const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const apis = require('./modules/Apis');



const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000')

const wsServer = new webSocketServer({
    httpServer: server
});

let client = {};

wsServer.on('request', function (request) {

    console.log(new Date() + ' Recieved a new connection from origin ' + request.origin + '.');

    // We can rewrite this to accept requests only from allowed origin
    const connection = request.accept(null, request.origin);
    client = connection;

    connection.on('message', function (message) {
        let msg;
        try {
            msg = JSON.parse(message.utf8Data);
        } catch (error) {
            client.send('Parse error')
            return;
        }
        if (message.type === 'utf8') {
            client.send('aaa');
            switch (msg.method) {
                case 'rpc_getLastBlock':
                    client.send(JSON.parse(apis.LastBlock()));
                    
                    break;
                case 'rpc_getBlockHashByNumber':
                    client.send(JSON.stringify(apis.getBlockHashByNumber(msg.params.num)));
                   
                    break;
                /*case 'rpc_getXBlocksAfterN':
                    websocketController.getXBlocksAfterN(client, msg.params.x, msg.params.n);
                    break;
                case 'rpc_getAccountsCount':
                    websocketController.getAccountsCount(client);
                    break;
                case 'rpc_getAddressTransactionsCount':
                    websocketController.getAddressTransactionsCount(client, msg.params.accountId);
                    break;
                case 'rpc_getAddressTransactions':
                    websocketController.getAddressTransactions(client, msg.params.accountId);
                    break;
                case 'rpc_getAccountBalance':
                    websocketController.getAccountBalance(client, msg.params.accountId.toString())
                    break;
                case 'rpc_getTransactionsCount':
                    websocketController.getTransactionsCount(client);
                    break;
                case 'rpc_getTransactionsFromBlock':
                    websocketController.getTransactionsFromBlock(client, msg.params.blockHash);
                    break;
                case 'rpc_getTransactionByHash':
                    websocketController.getTransactionByHash(client, msg.params.transactionHash);
                    break;
                case 'rpc_getXTransactionsAfterN':
                    websocketController.getXtransactionsAfterN(client, parseInt(msg.params.x), msg.params.n)
                    break;
            */}
        }
    })
})


