import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher from 'pusher';
import messageRoutes from './routes/Taskroutes.js'; 
import dotenv from 'dotenv';

dotenv.config();  

// App Config
const app = express();
const PORT = process.env.PORT || 3000;

// Pusher Config
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

// Database Config
const connection_url = process.env.MONGODB_URI;

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error));

// MongoDB Change Stream for Pusher
const db = mongoose.connection;
db.once("open", () => {
    console.log("Connected to MongoDB");

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log('A change occurred:', change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log('Error triggering Pusher for a non-insert operation');
        }
    });
});

// API Routes
app.use('/', messageRoutes);

// Listen
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
