import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    icon: { type: String},
    source: {type: String , required: true},         // ex: freelancer or salary
    amout: {type: Number, required: true},
    date: {type: Date, default: Date.now}
},{timestamps: true})

const Income = mongoose.model("incomeSchema ", incomeSchema);
export default Income;