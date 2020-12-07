import React from "react";
import { Formik } from "formik";
import { createLoginRequest } from "../requests/user";
import { validateLogInUser } from "../validators/userValidator";

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
		// Set User Here
	}
};

export default function Login() {
	return (
		<div>
			<Formik
				initialValues={{ email: "", password: "" }}
				validate={(values) => validateLoginForm(values)}
				onSubmit={(values, { setSubmitting }) =>
					submitLoginForm(values, setSubmitting)
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
