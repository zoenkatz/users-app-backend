//import dependency
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of database entries.
const UserSchema = new Schema({
    id: String,
    ID: Number,
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    marialStatus: String,
    kids: Array
});
//export our module to use in server.js
const User = mongoose.model('User', UserSchema);

module.exports = User;
