const options = {
    useMongoClient: true,
    //autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

module.exports = {
    port: process.env.Port || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/YachayServices',
    options: options,
    SECRET_TOKEN: 'ClaveDeHashSuperSecreta:V'
}