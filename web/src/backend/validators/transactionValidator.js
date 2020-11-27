import { isValidMongoId } from "./utils";

export const validateCreateTransaction = ({ receiver, sender, assets }) => {
	let status = true;
	let message = [];
	if (!isValidMongoId(receiver)) {
		status = false;
		message.push("Invalid receiver");
	}
	if (!isValidMongoId(sender)) {
		status = false;
		message.push("Invalid sender");
	}
	if (assets.length === 0) {
		status = false;
		message.push("Assets are empty");
		return { status, message };
	}
	assets.forEach((asset) => {
		if (!isValidMongoId(asset)) {
			status = false;
			message.push("Invalid asset");
			// eslint-disable-next-line no-useless-return
		}
	});
	return { status, message };
};
