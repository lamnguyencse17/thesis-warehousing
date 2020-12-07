import axios from "axios";

export const createLoginRequest = async ({ email, password }) => {
	const requestUrl = `${process.env.BACKEND_SERVER}/api/auth/login`;
	try {
		const res = await axios.post(requestUrl, { email, password });
		return { status: true, token: res.data };
	} catch (err) {
		return {
			status: false,
			errCode: err.response.status,
			message: err.response.data.message,
		};
	}
};

export const getUserRequest = () => {
	return axios
		.get(`${process.env.BACKEND_SERVER}/api/user`)
		.then((res) => {
			return { status: true, userData: res.data };
		})
		.catch((err) => {
			return {
				status: false,
				errCode: err.response.status,
				message: err.response.data.message,
			};
		});
};

export const createRegisterRequest = async ({ name, email, password }) => {
	const requestUrl = `${process.env.BACKEND_SERVER}/api/auth/register`;
	try {
		await axios.post(requestUrl, { name, email, password });
		return { status: true };
	} catch (err) {
		return {
			status: false,
			errCode: err.response.status,
			message: err.response.data.message,
		};
	}
};
