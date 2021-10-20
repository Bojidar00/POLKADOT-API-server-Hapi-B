'use strict';

const apis = require('../modules/Apis');

exports.plugin = {
    name: 'routes',
    version: '1.0.0',
    register: async function (server, options) {

       

        server.route({
            method: 'GET',
            path: '/api/node/blocks',
            handler: function (request, h) {

                return apis.LastBlock();
            }
        });

        server.route({
            method: 'GET',
            path: '/api/node/blocks/num/:number',
            handler: function (request, h) {

                return apis.getBlockHashByNumber;
            }
        });
        
        server.route({
            method: 'POST',
            path: '/api/node/blocks/hash',
            handler: function (request, h) {

                return apis.getBlockByHash;
            }
        });

        server.route({
            method: 'GET',
            path: '/api/node/blocks/:x/:n',
            handler: function (request, h) {

                return apis.getXBlocksAfterN;
            }
        });

        server.route({
            method: 'GET',
            path: '/api/node/accounts/count/',
            handler: function (request, h) {

                return apis.getAccountsCount;
            }
        });

        server.route({
            method: 'GET',
            path: '/api/node/address/transactions/count/:address',
            handler: function (request, h) {

                return apis.getAccountTransactionsCount;
            }
        });


        server.route({
            method: 'GET',
            path: '/api/node/address/transactions/:address',
            handler: function (request, h) {

                return apis.getAccountTransactions;
            }
        });

        server.route({
            method: 'GET',
            path: '/api/node/address/balance/:address',
            handler: function (request, h) {

                return apis.getAccountBalance;
            }
        });

        server.route({
            method: 'GET',
            path: '/api/node/transactions/:x/:n',
            handler: function (request, h) {

                return apis.getXTransactionsAfterNth;
            }
        });

        server.route({
            method: 'GET',
            path: '/api/node/transactions/count',
            handler: function (request, h) {

                return apis.getTransactionsCount;
            }
        });

        server.route({
            method: 'GET',
            path: '/api/node/transactions/block',
            handler: function (request, h) {

                return apis.getTransactionsFromBlock;
            }
        });

        server.route({
            method: 'POST',
            path: '/api/node/transactions/hash',
            handler: function (request, h) {

                return apis.getTransactionByHash;
            }
        });
       
       
    }
};