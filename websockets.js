const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const apis = require('./modules/wsApis');



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

    connection.on('message',async function (message) {
        let msg;
        try {
            msg = JSON.parse(message.utf8Data);
        } catch (error) {
            client.send('Parse error')
            return;
        }
        if (message.type === 'utf8') {
            var res;
            switch (msg.method) {
                
                case 'rpc_getLastBlock':
                    res =await apis.LastBlock();
                    
                    
                    
                    break;
                case 'rpc_getBlockHashByNumber':
                    
                    res =await apis.getBlockHashByNumber(msg.params.num);
                    
                   
                    break;
                case 'rpc_getBlockByHash':
                    
                    res =await apis.getBlockByHash(msg.params.hash);
                    
                   
                    break;
                case 'rpc_getXBlocksAfterN':
                    res = await apis.getXBlocksAfterN(msg.params.x, msg.params.n);
                   
                    break;
                case 'rpc_getAccountsCount':
                    res = await apis.getAccountsCount();
                   
                    break;
                case 'rpc_getAddressTransactionsCount':
                    res = await apis.getAccountTransactionsCount(msg.params.accountId);
                    
                    break;
                case 'rpc_getAddressTransactions':
                    res = await apis.getAccountTransactions(msg.params.accountId);
                    
                    break;
                case 'rpc_getAccountBalance':
                    res = await apis.getAccountBalance(msg.params.accountId);
                   
                    break;
                case 'rpc_getTransactionsCount':
                    res = await apis.getTransactionsCount();
                    
                    break;
                case 'rpc_getTransactionsFromBlock':
                    res = await apis.getTransactionsFromBlock(msg.params.blockHas);
                    
                    break;
                case 'rpc_getTransactionByHash':
                    res = await apis.getTransactionByHash(msg.params.transactionHash);
                    
                    break;
                case 'rpc_getXTransactionsAfterN':
                    res = await apis.getXTransactionsAfterNth(msg.params.x,msg.params.n);
                    
                    break;
            }
            client.send(res);
        }
    })
})


