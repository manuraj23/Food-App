const { MongoClient } = require("mongodb");

const mongoURI = "mongodb://localhost:27017";
const dbName = "testbd";

let db;

async function connectDB() {
    if (!db) {
        const client = new MongoClient(mongoURI);
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    }
    return db;
}

module.exports = connectDB;
