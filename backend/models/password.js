const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  site:String,
  username:String,
  password:String,
  id:String
});

module.exports = mongoose.model('Password', passwordSchema,'passwords' );
