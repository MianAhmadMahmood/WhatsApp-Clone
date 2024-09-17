import Messages from '../model/Model.js';

// Sync messages from MongoDB
export const syncMessages = async (req, res) => {
    try {
        const data = await Messages.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Create a new message
export const createMessage = async (req, res) => {
    const dbMessage = req.body;

    try {
        const data = await Messages.create(dbMessage);
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
};
