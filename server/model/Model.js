import mongoose from 'mongoose';

const WhatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

export default mongoose.model('Message', WhatsappSchema);
