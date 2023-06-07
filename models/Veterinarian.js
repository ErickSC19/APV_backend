import mongoose from "mongoose";
import generateToken from "../helpers/generateToken.js";
import bcrypt from "bcrypt";

const veterinarianSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tel: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generateToken(),
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

veterinarianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

veterinarianSchema.methods.verifyPassword = async function (passwordGiven) {
  return await bcrypt.compare(passwordGiven, this.password);
};

const Veterinarian = mongoose.model("Veterinarian", veterinarianSchema);
export default Veterinarian;
