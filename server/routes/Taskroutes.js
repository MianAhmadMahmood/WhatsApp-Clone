import express from 'express';
import { syncMessages, createMessage } from '../controller/Controllers.js'; 

const router = express.Router();

// GET: Sync messages from MongoDB
router.get('/messages/sync', syncMessages);

// POST: Create a new message
router.post('/messages/new', createMessage);

export default router;
