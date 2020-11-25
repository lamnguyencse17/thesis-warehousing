import { composeWithMongoose } from "graphql-compose-mongoose";
import mongoose from "mongoose";

const Users = mongoose.Schema;

export const UsersSchema = new Users({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("Users", UsersSchema);
export default userModel;
export const userTC = composeWithMongoose(userModel);