const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/local';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
}

module.exports = {
  connect,
  client,
};