
const apiConnection = require('../nodeConnection')
const dbConnection = require('../dbConnection')

const connectApi = apiConnection.getNodeConnection().then((api) => {
    return api;
  });
  const connectDb = dbConnection.getDbConnection().then((db) => {
    db.connect().then(console.log("Connected to PostgreSQL from Server"));
    return db;
});  
       exports.LastBlock= async (req, h) => {
           
               return await connectApi.then(api => api.rpc.chain.getBlock())
          
        }

        

        exports.getBlockHashByNumber = async (req, h) => {
            const number = req.params.number;
            return connectApi.then(api => api.rpc.chain.getBlockHash(number));
        }
        
        exports.getBlockByHash = async (req, h) => {
            const payload = req.payload;
            const hash = payload.hash;
            return connectApi.then(api => api.rpc.chain.getBlock(hash));
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
           

            const result = await connectDb.query(`SELECT COUNT(DISTINCT recipient)+COUNT(DISTINCT sender) AS count FROM transactions`);
            return result?.rows;
        }
        
        exports.getAccountTransactionsCount = async (req, h) => {
            const address = req.params.address;

            
            const result = await connectDb.query(`SELECT COUNT(*) AS count FROM transactions WHERE sender='${address}' OR recipient='${address}'`);
            return result?.rows;
            
        }
        
        exports.getAccountTransactions = async (req, h) => {
            const address = req.params.address;

            
            const result = await connectDb.query(`SELECT * FROM transactions WHERE recipient='${address}' OR sender='${address}'`);
            return result?.rows;
        }
        
        exports.getAccountBalance = async (req, h) => {
            const address = req.params.address;

            
            return connectApi.then(api => api.query.system.account(address));
        }
        exports.getTransactionsCount = async (req, h) => {
          
            result = await connectDb.query(`SELECT COUNT(*) AS count FROM transactions`);
            return  result?.rows;
        }
        
        exports.getTransactionsFromBlock = async (req, h) => {
            const hash = req.params.hash;

            
            const result = await connectDb.query(`SELECT * FROM transactions WHERE block_hash='${hash}'`);
            return result?.rows;
        }
        
        exports.getTransactionByHash = async (req, h) => {
            const hash = req.params.hash;
          
            const result = await connectDb.query(`SELECT * FROM transactions WHERE hash='${hash}'`);
            return result?.rows;
        }
        
        exports.getXTransactionsAfterNth = async (req, h) => {
            const x = req.params?.x;
            const n = req.params?.n;
            
            const result = await connectDb.query(`SELECT * FROM transactions WHERE id < ${n} AND id > ${n} - ${x} LIMIT ${x}`);
            return result?.rows;
        }
        