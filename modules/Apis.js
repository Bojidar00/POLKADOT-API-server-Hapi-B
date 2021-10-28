
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
           try{
               return await connectApi.then(api => api.rpc.chain.getBlock())
            } catch (error) {
                return "Some error occurred!";}
          
        }

        

        exports.getBlockHashByNumber = async (req, h) => {
            try{
            const number = req.params.number;
            return connectApi.then(api => api.rpc.chain.getBlockHash(number));
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getBlockByHash = async (req, h) => {
            try{
            const payload = req.payload;
            const hash = payload.hash;
            return connectApi.then(api => api.rpc.chain.getBlock(hash));
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getXBlocksAfterN = async (req, h) => {
            try{
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
        } catch (error) {
            return "Some error occurred!";}
        
        }
    
        exports.getAccountsCount = async (req, h) => {
           try{

            const result = await connectDb.query(`SELECT COUNT(DISTINCT recipient)+COUNT(DISTINCT sender) AS count FROM transactions`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getAccountTransactionsCount = async (req, h) => {
            try{
            const address = req.params.address;

            
            const result = await connectDb.query(`SELECT COUNT(*) AS count FROM transactions WHERE sender='${address}' OR recipient='${address}'`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
            
        }
        
        exports.getAccountTransactions = async (req, h) => {
            try{
            const address = req.params.address;

            
            const result = await connectDb.query(`SELECT * FROM transactions WHERE recipient='${address}' OR sender='${address}'`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getAccountBalance = async (req, h) => {
            try{
            const address = req.params.address;

            
            return connectApi.then(api => api.query.system.account(address));
        } catch (error) {
            return "Some error occurred!";}
        }
        exports.getTransactionsCount = async (req, h) => {
          try{
            result = await connectDb.query(`SELECT COUNT(*) AS count FROM transactions`);
            return  result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getTransactionsFromBlock = async (req, h) => {
            try{
            const hash = req.params.hash;

            
            const result = await connectDb.query(`SELECT * FROM transactions WHERE block_hash='${hash}'`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getTransactionByHash = async (req, h) => {
            try {
            const hash = req.params.hash;
          
            const result = await connectDb.query(`SELECT * FROM transactions WHERE hash='${hash}'`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getXTransactionsAfterNth = async (req, h) => {
            try {
            const x = req.params?.x;
            const n = req.params?.n;
            
            const result = await connectDb.query(`SELECT * FROM transactions WHERE id < ${n} AND id > ${n} - ${x} LIMIT ${x}`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        