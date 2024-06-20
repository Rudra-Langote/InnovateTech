// const mongoose = require('mongoose')
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true }
});


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number },
    desc: { type: String },
    img: { type: String },
    reviews: { type: [reviewSchema], default: [] } // Add the elements array of objects
});

mongoose.models = {}
export default mongoose.model("product", productSchema)