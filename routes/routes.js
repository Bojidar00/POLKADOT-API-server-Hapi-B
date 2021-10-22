'use strict';

const apis = require('../modules/Apis');

exports.plugin = {
    name: 'routes',
    version: '1.0.0',
    register: async function (server, options) {

       

        server.route({
            method: 'GET',
            path: '/api/node/blocks',
            handler: apis.LastBlock
            
        });

        server.route({
            method: 'GET',
            path: '/api/node/blocks/num/{number}',
            handler:apis.getBlockHashByNumber
            
        });
        
        server.route({
            method: 'POST',
            path: '/api/node/blocks/hash',
            handler: apis.getBlockByHash,
            options: {
                payload: {
                    multipart: true
                }
            }
            
        
        });

        server.route({
            method: 'GET',
            path: '/api/node/blocks/{x}/{n}',
            handler: apis.getXBlocksAfterN
            
        });

        server.route({
            method: 'GET',
            path: '/api/node/accounts/count/',
            handler: apis.getAccountsCount
            
        });

        server.route({
            method: 'GET',
            path: '/api/node/address/transactions/count/{address}',
            handler: apis.getAccountTransactionsCount
            
        });


        server.route({
            method: 'GET',
            path: '/api/node/address/transactions/{address}',
            handler: apis.getAccountTransactions
            
        });

        server.route({
            method: 'GET',
            path: '/api/node/address/balance/{address}',
            handler: apis.getAccountBalance
            
        });

        server.route({
            method: 'GET',
            path: '/api/node/transactions/{x}/{n}',
            handler: apis.getXTransactionsAfterNth
            
        });

        server.route({
            method: 'GET',
            path: '/api/node/transactions/count',
            handler: apis.getTransactionsCount
            
        });

        server.route({
            method: 'GET',
            path: '/api/node/transactions/block',
            handler: apis.getTransactionsFromBlock
            
        });

        server.route({
            method: 'POST',
            path: '/api/node/transactions/hash',
            handler: apis.getTransactionByHash
            
        });
       
       
    }
};