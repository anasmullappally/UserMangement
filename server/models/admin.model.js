const mongoose = require('mongoose')

const Admin = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }, {
    collection: 'admin-data'
})

const adminModel = mongoose.model('AdminData', Admin)

module.exports = adminModel