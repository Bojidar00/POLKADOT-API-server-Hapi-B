
const apiConnection = require('../nodeConnection')
const dbConnection = require('../dbConnection')


 /* const connectDb = dbConnection.getDbConnection().then((db) => {
    db.connect().then(console.log("Connected to PostgreSQL from Server"));
    return db;
});*/
exports.LastBlock= async (req, h) => {
           
               return await apiConnection.getNodeConnection().then((api) => { api.rpc.chain.getBlock();});
          
        }

        /*

        exports.getBlockHashByNumber = async (req, h) => {
            const blockNumber = req.params.blockNumber;
            return connectApi.then(api => api.rpc.chain.getBlockHash(blockNumber));
        }
        
        exports.getBlockByHash = async (req, h) => {
            const blockHash = req.params.blockHash;
            return connectApi.then(api => api.rpc.chain.getBlock(blockHash));
        }
        
        exports.getXBlocksAfterN = async (req, h) => {
            const x = req.params.x;
            const n = req.params.n;
        
            return connectApi.then( async api => {
                let i = 1;
                let blocks = [];
                
                while (i <= x)  {
                    let tempBlock = await api.rpc.chain.getBlockHash(n-i);
                    blocks.push(tempBlock);
                    i++;
                }
        
                return blocks;
            })
        
        }
    
        exports.getAccountsCount = async (req, h) => {
            const result = await req.pg.client.query(`SELECT COUNT(DISTINCT recipient)+COUNT(DISTINCT sender) AS count FROM transactions`);
            return result?.rows;
        }
        
        exports.getAccountTransactionsCount = async (req, h) => {
            const accountId = req.params.accountId;
            const result = await req.pg.client.query(`SELECT COUNT(*) AS count FROM transactions WHERE sender='${accountId}' OR recipient='${accountId}'`);
            return result?.rows;
        }
        
        exports.getAccountTransactions = async (req, h) => {
            const accountId = req.params.accountId;
            const result = await req.pg.client.query(`SELECT * FROM transactions WHERE recipient='${accountId}' OR sender='${accountId}'`);
            return result?.rows;
        }
        
        exports.getAccountBalance = async (req, h) => {
            const accountId = req.params.accountId;
            return connectApi.then(api => api.query.system.account(accountId));
        }
        exports.getTransactionsCount = async (req, h) => {
            result = await req.pg.client.query(`SELECT COUNT(*) AS count FROM transactions`);
            return  result?.rows;
        }
        
        exports.getTransactionsFromBlock = async (req, h) => {
            const blockHash = req.params.blockHash;
            const result = await req.pg.client.query(`SELECT * FROM transactions WHERE block_hash='${blockHash}'`);
            return result?.rows;
        }
        
        exports.getTransactionByHash = async (req, h) => {
            const transactionHash = req.params.transactionHash;
            const result = await req.pg.client.query(`SELECT * FROM transactions WHERE hash='${transactionHash}'`);
            return result?.rows;
        }
        
        exports.getXTransactionsAfterNth = async (req, h) => {
            const x = req.params?.x;
            const n = req.params?.n;
            const result = await req.pg.client.query(`SELECT * FROM transactions WHERE id < ${n} AND id > ${n} - ${x} LIMIT ${x}`);
            return result?.rows;
        }
        */