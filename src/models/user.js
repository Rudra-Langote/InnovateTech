
const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    price: {type: Number, required: true}
});

const userSchema = new mongoose.Schema({
    firstname : { type : String },
    lastname : { type : String },
    email : { type : String },
    username : { type : String },
    pass : { type : String },
    address : { type : String },
    cart : { type: [cartSchema], default: [] }
})
mongoose.models = {}
export default mongoose.model("user", userSchema)