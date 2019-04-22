const mongoose = require('mongoose');

require('../models/shoplistModel');

mongoose.connect('mongodb://localhost/ShoppingList_db',  { useNewUrlParser: true }, (err) => {
    if(err){
        process.exit(1);
    } else {
        console.log("DB connection Success");
    }
});

mongoose.set('debug', true);

module.exports = mongoose;
