const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname : { type : String },
    lastname : { type : String },
    email : { type : String },
    username : { type : String },
    pass : { type : String },
    address : { type : String }
})
mongoose.models = {}
export default mongoose.model("user", userSchema)