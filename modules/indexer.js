const dbConnection = require('../dbConnection');
const apiConnection = require("../nodeConnection");


const run =  () => {
dbConnection.getDbConnection().then((db) => {
    db.connect().then(console.log("Connected to PostgreSQL from Server"));
    


db.query('CREATE TABLE IF NOT EXISTS transactions(' + 
  'hash VARCHAR(255) NOT NULL,' +
  'issigned BOOLEAN NOT NULL,' +
  'recipient VARCHAR(255) NOT NULL,' +
  'amount VARCHAR(255) NOT NULL,' +
  'method VARCHAR(255) NOT NULL,' +
  'nonce VARCHAR(255) NOT NULL,' +
  'signature VARCHAR(255) NOT NULL,' +
  'sender VARCHAR(255) NOT NULL,' +
  'block_hash VARCHAR(255) NOT NULL' +
')',
(err, res) => {
  if (!err)
    console.log(
      "Created transactions table: " + res
    );
  else console.log("Error occured: " + err.message);
})



const connect = apiConnection.getNodeConnection().then((api) => {
  return api;
});

connect.then((api) => {
  (async function getLastBlockNumber() {
    let lastBlock;
    let lastBlockNumber;
    let firstBlockWithTx;

    try {
      lastBlock = await api.rpc.chain.getBlock();
      lastBlockNumber = parseInt(lastBlock.block.header.number.toString());
      firstBlockWithTx = parseInt("1248328");
    } catch (err) {
      console.log('Block %d fetch failed. Error: %O ;', lastBlockNumber, err);
    }

    if (lastBlockNumber < firstBlockWithTx) {
      console.log(`Waiting to sync: ${lastBlockNumber}/${firstBlockWithTx}`);
      try{
        await getLastBlockNumber();
      }catch(e){
        console.log('ERROR: ' + e);
        process.exit(1);
      }
      
    } else {
      let i = 1248328;

      (async function fillDb() {
        while (true) {
          const blockHash = await api.rpc.chain.getBlockHash(i);

          if (!blockHash) {
            console.log("All blocks updated");
            continue;
          }

          const currentBlock = await api.rpc.chain.getBlock(blockHash);

          currentBlock.block.extrinsics.forEach((ex) => {
            const signature = ex.signature;
            const nonce = ex.nonce;
            const isSigned = ex.isSigned;
            const recipient = ex.method.args[0];
            const amount = ex.method.args[1];
            const method = ex.method.method;
            const sender = ex.signer;
            const hash = ex.hash.toHex().toString();
            const blockHash = currentBlock.block.header.hash.toHex();
            const blockNumber = currentBlock.block.header.number.toHuman();
            //  console.log('NUMBER: ' + blockNumber);

            if (method == "transfer") {
                db.query(
                `INSERT INTO transactions(hash, issigned, recipient, amount, method, nonce, signature, sender, block_hash)` +
                  `VALUES('${String(hash)}', '${isSigned}', '${String(recipient)}', '${String(amount)}', 
                         '${String(method)}', '${String(nonce)}', '${String(signature)}', '${String(sender)}', '${String(blockHash)}')`,
                (err, res) => {
                  if (!err)
                    console.log(
                      "Inserted to DB transaction from block with number: " +
                        blockNumber
                    );
                  else console.log("Error occured: " + err.message);
                }
              );
            } 
          });
          i++;
        }
      })();
    }
  })();
});
});
}
module.exports = { run };