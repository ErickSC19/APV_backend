import Veterinarian from "../models/Veterinarian.js";
import generateJWT from "../helpers/generateJWT.js";
import generateToken from "../helpers/generateToken.js";
import registerEmail from "../helpers/registerEmail.js";
import forgottenPassEmail from "../helpers/forgottenPassEmail.js";

const register = async (req, res) => {
  const { email, name } = req.body;

  const userExists = await Veterinarian.findOne({ email });

  if (userExists) {
    const error = new Error("This e-mail is being used");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Creates a new veterinarian
    const veterinarian = new Veterinarian(req.body);
    const savedVeterinarian = await veterinarian.save();

    // Send email
    registerEmail({
      email,
      name,
      token: savedVeterinarian.token,
    });

    res.json({ msg: "Registering new user..." });
  } catch (error) {
    console.log(error);
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await Veterinarian.findOne({ token });

  if (!userConfirm) {
    const error = new Error("Wrong token");
    return res.status(404).json({ msg: error.message });
  }

  try {
    userConfirm.token = null;
    userConfirm.confirmed = true;
    await userConfirm.save();

    res.json({ msg: "Account validated" });
  } catch (error) {
    console.log(error);
  }
};

const authUser = async (req, res) => {
  const { email, password, keep } = req.body;
  console.log(req.body);
  const user = await Veterinarian.findOne({ email });

  //if the user exists
  if (!user) {
    const error = new Error("User doesn't exists");
    return res.status(404).json({ msg: error.message });
  }

  //if the user is confirmed
  if (!user.confirmed) {
    const error = new Error("Your acount has not been confirmed yet");
    return res.status(403).json({ msg: error.message });
  }

  if (await user.verifyPassword(password)) {
    //console.log('Password verified');
    const r = generateJWT(user.id, keep);
    res.json({ token: r });
  } else {
    const error = new Error("Your password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
};

const firebaseAuth = async (req, res) => {
  const { email, firebaseUid } = req.body;
  console.log(req.body);
  if (!req.body.name) {
    const splEmail = email.split('@');
    req.body.name = splEmail[0];
  }
  const user = await Veterinarian.findOne({ email });
  if (user) {
    if (!firebaseUid) {
      const error = new Error("Error with login.");
      return res.status(403).json({ msg: error.message });
    }
    const r = generateJWT(user.id);
    res.json({ token: r });
  } else {
    if (!firebaseUid) {
      const error = new Error("Error with login.");
      return res.status(403).json({ msg: error.message });
    }
    const veterinarian = new Veterinarian(req.body);
    const savedVeterinarian = await veterinarian.save();
    const r = generateJWT(savedVeterinarian.id);
    res.json({ token: r });
  }
};

const forgottenPassword = async (req, res) => {
  const { email } = req.body;

  const veterinarianExists = await Veterinarian.findOne({ email });
  if (!veterinarianExists) {
    const error = new Error("User does not exist");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinarianExists.token = generateToken();
    await veterinarianExists.save();

    //Send email
    forgottenPassEmail({
      email,
      name: veterinarianExists.name,
      token: veterinarianExists.token,
    });

    res.json({ msg: "We sent instructions to your e-mail" });
  } catch (error) {
    console.log(error);
  }
};
const checkPToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await Veterinarian.findOne({ token });

  if (validToken) {
    res.json({ msg: "Valid token, user exists" });
  } else {
    const error = new Error("Token not valid");
    return res.status(400).json({ msg: error.message });
  }
};
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinarian = await Veterinarian.findOne({ token });

  if (!veterinarian) {
    const error = new Error("Token not valid");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinarian.token = null;
    veterinarian.password = password;
    await veterinarian.save();
    res.json({ msg: "Password modified" });
  } catch (error) {
    console.log(error);
  }
};

const profile = (req, res) => {
  const { veterinarian } = req;

  res.json({ veterinarian });
};

export {
  register,
  profile,
  confirm,
  forgottenPassword,
  authUser,
  checkPToken,
  newPassword,
  firebaseAuth
};
