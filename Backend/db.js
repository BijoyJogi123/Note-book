const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://notebook:notebook123@cluster0.jfywffi.mongodb.net/note_book"
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;