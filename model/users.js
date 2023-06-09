const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    sUserName: {
      type: String,
      unique: true
    },
    sUserCity: String,
    sRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      }
})

module.exports = mongoose.model('User',userSchema);