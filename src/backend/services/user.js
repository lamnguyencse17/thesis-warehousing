import userModel from "../models/users";
import mongoose from "mongoose";

export const createUser = async ({email, password, name}) => {
    const result = await userModel.create({
        name,
        email,
        password
    });
    return { result, status: true };
};
export const getUserById = async (_id) => {
    const result = await userModel.findOne({_id: mongoose.Types.ObjectId(_id)});
    let status = true;
    if (!result){
        status = false;
    }
    return { result, status};
};

export const getUserByEmail = async (email) => {
    const result = await userModel.findOne({email});
    let status = true;
    let message;
    if (!result){
        status = false;
        message = "User is not found";
    }
    return { result, status, message};
};