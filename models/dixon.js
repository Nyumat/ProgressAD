import mongoose from "mongoose";

const dixonSchema = new mongoose.Schema({
	machine_name: {
		type: String,
		required: false,
		unique: false
	},
	machine_id: {
		// uuid
		type: String,
		required: false,
		unique: true
	},
	machine_image: {
		// cloudinary
		type: String,
		required: false,
		unique: false
	},
	machine_type: {
		type: String,
		enum: ["Cardio", "Strength", "Other", "none"],
		default: "none",
		required: false
	},
	machine_status: {
		// 1,true = available, 0,false = in use
		type: Boolean,
		required: false,
		default: true
	}
});

const Dixon = mongoose.model("Dixon", dixonSchema);
export { Dixon };
