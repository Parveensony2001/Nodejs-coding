const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Description: {
        type: String,
        required: true
    },
    Category: {
        type:String,
        required:true
    },
    Date: {
        type: String,
        required: true
    }
});
const Contact  =  mongoose.model('backend-detabase', contactSchema);
module.exports = Contact;