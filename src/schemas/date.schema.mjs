
import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pet",
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "owner",
        required: true
    },
    vet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vet",
        required: true 
    },
    state: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

const dateModel = mongoose.model ( 'date', dateSchema )

export default dateModel