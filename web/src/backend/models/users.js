import mongoose from "mongoose";

const Users = mongoose.Schema;

export const UsersSchema = new Users({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	deletedAt: { type: Date, default: null },
	role: {
		userType: {type: Number, required: true},
		scope: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Organizations" }]
	}
});

const userModel = mongoose.model("Users", UsersSchema);
export default userModel;
