
const apiConnection = require('../nodeConnection')
const dbConnection = require('../dbConnection')

const connectApi = apiConnection.getNodeConnection().then((api) => {
    return api;
  });
  const connectDb = dbConnection.getDbConnection().then((db) => {
    db.connect().then(console.log("Connected to PostgreSQL from Server"));
    return db;
});  
       exports.LastBlock= async () => {
           try{
               return await connectApi.then(api => api.rpc.chain.getBlock())
            } catch (error) {
                return "Some error occurred!";}
          
        }

        

        exports.getBlockHashByNumber = async (number) => {
           try{
            return connectApi.then(api => api.rpc.chain.getBlockHash(number));
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getBlockByHash = async (hash) => {
            
           try{
            return connectApi.then(api => api.rpc.chain.getBlock(hash));
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getXBlocksAfterN = async (x,n) => {
         
        try{
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
    
        exports.getAccountsCount = async () => {
           try{

            const result = await connectDb.query(`SELECT COUNT(DISTINCT recipient)+COUNT(DISTINCT sender) AS count FROM transactions`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getAccountTransactionsCount = async (address) => {
            
             try{
            
            const result = await connectDb.query(`SELECT COUNT(*) AS count FROM transactions WHERE sender='${address}' OR recipient='${address}'`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
            
        }
        
        exports.getAccountTransactions = async (address) => {
         

            try{
            const result = await connectDb.query(`SELECT * FROM transactions WHERE recipient='${address}' OR sender='${address}'`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getAccountBalance = async (address) => {
          

            try{
            return connectApi.then(api => api.query.system.account(address));
        } catch (error) {
            return "Some error occurred!";}
        }
        exports.getTransactionsCount = async () => {
          try{
            result = await connectDb.query(`SELECT COUNT(*) AS count FROM transactions`);
            return  result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getTransactionsFromBlock = async (hash) => {
            
            try{
            
            const result = await connectDb.query(`SELECT * FROM transactions WHERE block_hash='${hash}'`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getTransactionByHash = async (hash) => {
         
          try{
            const result = await connectDb.query(`SELECT * FROM transactions WHERE hash='${hash}'`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        
        exports.getXTransactionsAfterNth = async (x,n) => {
           try{
            
            const result = await connectDb.query(`SELECT * FROM transactions WHERE id < ${n} AND id > ${n} - ${x} LIMIT ${x}`);
            return result?.rows;
        } catch (error) {
            return "Some error occurred!";}
        }
        