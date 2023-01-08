import mongoose from "mongoose";
const dixonSchema = new mongoose.Schema({
    machine_name: {
        type: String,
        required: true,
        unique: true
    },
    machine_id: {
        // uuid
        type: String,
        required: true,
        unique: true
    },
    machine_image: {
        // cloudinary
        type: String,
        required: true,
        unique: true
    },
    machine_type: {
        type: String,
        enum: ["Cardio", "Strength", "Other", "None"],
        default: "None",
        required: true
    },
    machine_status: {
        // 1,true = available, 0,false = in use
        type: Boolean,
        required: true,
        default: true
    }
});
const Dixon = mongoose.model("Dixon", dixonSchema);
export default Dixon;
