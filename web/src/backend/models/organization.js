import mongoose from "mongoose";

const Organizations = mongoose.Schema;

export const OrganizationsSchema = new Organizations({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	deletedAt: { type: Date, default: null },
});

const organizationModel = mongoose.model("Organizations", OrganizationsSchema);
export default organizationModel;
