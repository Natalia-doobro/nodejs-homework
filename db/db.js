const { MongoClient } = require('mongodb');
require('dotenv').config()

const uri = process.env.URI_DB;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = client.connect();

process.on('SIGINT', async () => {
    const client = await db;
    client.close();
    console.log('Connection DB closed')
})

module.exports = db;