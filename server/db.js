const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const DB_PASS = process.env.DB_PASS;
const DB_URL = `mongodb+srv://btiahwpweb:${DB_PASS}@cluster0.9nknrlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let db;
const client = new MongoClient(DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function dbConnect() {
    if (!db) {
        try {
            await client.connect();
            db = client.db('sample_mflix');

            // const collection = db.collection('messages');

            // const messages = [
            //     {
            //         userId: 'user001',
            //         message: 'Hey, how are you?',
            //         time: new Date() // current time
            //     },
            //     {
            //         userId: 'user002',
            //         message: 'I\'m good, thanks!',
            //         time: new Date()
            //     },
            //     {
            //         userId: 'user001',
            //         message: 'Want to catch up later?',
            //         time: new Date()
            //     },
            //     {
            //         userId: 'user003',
            //         message: 'Sure, let me know what time.',
            //         time: new Date()
            //     },
            // ];

            // await collection.insertMany(messages);

            console.log("✅ Connected to MongoDB");
        } catch (error) {
            console.error("❌ MongoDB Connection Error:", error);
            process.exit(1);
        }
    }
    return db;
}

module.exports = dbConnect;