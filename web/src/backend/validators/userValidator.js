import { isValidEmail, isValidName, isValidPassword } from "./utils";

export const validateCreateUser = ({ email, password, name, role }) => {
	let status = true;
	let message = [];
	if (!isValidName(name)) {
		status = false;
		message.push("Invalid name");
	}
	if (!isValidEmail(email)) {
		status = false;
		message.push("Invalid email");
	}
	if (!isValidPassword(password)) {
		status = false;
		message.push("Invalid password");
	}
	if (role === undefined){
		status = false;
		message.push("Invalid role");
		return { status, message };
	}
	if (role.userType === undefined || role.userType > 2){
		status = false;
		message.push("Invalid userType");
	}
	if (role.scope === undefined || !Array.isArray(role.scope)){
		status = false;
		message.push("Invalid scope");
	}
	return { status, message };
};

export const validateLogInUser = ({ email, password }) => {
	let status = true;
	let message = [];
	if (!isValidEmail(email)) {
		status = false;
		message.push("Invalid email");
	}
	if (!isValidPassword(password)) {
		status = false;
		message.push("Invalid password");
	}
	return { status, message };
};
