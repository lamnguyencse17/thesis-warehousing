import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";
import { createUser, getUserByEmail, getUserById } from "../services/user";
import { hashPassword, comparePassword } from "../utils/password";
import createToken from "../utils/token";
import { validateCreateUser, validateLogInUser } from "../validators/userValidator";

export const registerController = async (req, res) => {
  const { email, name } = req.body;
  let password = req.body.password;
  let validateResult = validateCreateUser({ email, password, name });
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  const duplicate = await getUserByEmail(email);
  if (duplicate.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Duplicate Email!" });
  }
  password = await hashPassword(password);
  let { result, status } = await createUser({ email, password, name });
  if (!status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Something went wrong" });
  }
  return res.status(OK_RESPONSE).json(result);
};

export const logInController = async (req, res) => {
  const {email, password} = req.body;
  const validateResult = validateLogInUser({email, password});
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  let user = await getUserByEmail(email);
  if (!user.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: user.message });
  }
  user = user.result;
  const result = await comparePassword(password, user.password);
  if (!result.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: result.message });
  }
  const token = createToken({_id: user._id, email});
  return res
    .status(OK_RESPONSE)
    .cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
    })
    .json({
      token
    });
};

export const getUserController = async (req, res) => {
  const _id = req._id;
  let { result, status } = await getUserById(_id);
  if (!status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Something went wrong" });
  }
  result = result.toObject();
  let user = {...result};
  delete user.password;
  return res.status(OK_RESPONSE).json(user);
};