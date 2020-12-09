import React from "react";
import { Formik } from "formik";
import { createLoginRequest } from "../requests/user";
import { validateLogInUser } from "../validators/userValidator";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user";
import { useHistory } from "react-router-dom";

const validateLoginForm = (values) => {
	const { email, password } = values;
	const { status, message } = validateLogInUser({ email, password });
	if (status === false) {
		if (message.email !== "" || message.password !== "") {
			return { ...message };
		}
	}
};

const submitLoginForm = async (values, setSubmitting) => {
	setSubmitting(true);
	const { email, password } = values;
	const { status, token, message } = createLoginRequest({ email, password });
	setSubmitting(false);
	if (!status) {
		console.error(message);
	} else {
		return token;
	}
};

export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();
	const processSubmitLogin = async (values, setSubmitting) => {
		const token = await submitLoginForm(values, setSubmitting);
		dispatch(setUser(token)).then(() => history.push("/admin/dashboard"));
	};
	return (
		<div>
			<Formik
				initialValues={{ email: "", password: "" }}
				validate={(values) => validateLoginForm(values)}
				onSubmit={(values, { setSubmitting }) =>
					processSubmitLogin(values, setSubmitting)
				}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit}>
						<input
							type='email'
							name='email'
							onChange={handleChange}
							value={values.email}
							placeholder='Email'
							disabled={isSubmitting}
						/>
						{errors.email && touched.email && errors.email}
						<input
							type='password'
							name='password'
							onChange={handleChange}
							value={values.password}
							placeholder='Password'
							disabled={isSubmitting}
						/>
						{errors.password && touched.password && errors.password}
						<button type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
}
