const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://alm:test123@ds113482.mlab.com:13482/message-parser')
  .then(() => console.log('DB connect'))
  .catch(e => console.log(e));

module.exports = mongoose;