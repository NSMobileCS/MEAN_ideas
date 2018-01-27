const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require("./config/mongoose");

module.exports = {
    Idea: mongoose.model('Idea'),
    Like: mongoose.model('Like'),
    User: mongoose.model('User')
}
