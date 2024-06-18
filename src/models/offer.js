const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    img : {type:String}
})

mongoose.models = {}
export default mongoose.model("offer", offerSchema)