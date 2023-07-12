const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});
const Contact  =  mongoose.model('backend-detabase', contactSchema);

module.exports = Contact;