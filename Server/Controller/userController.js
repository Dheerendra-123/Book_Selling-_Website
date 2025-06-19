import { userModel } from "../Model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      message: "Please enter all fields",
      sucess: false,
      status: 400,
    });
  }
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.json({
        message: "User Already exist with this email id",
        sucess: false,
      });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    console.log("User Created Successfully", newUser);
    return res.json({
      message: "User Registerd Sucessfully",
      sucess: true,
      status: 200,
    });
  } catch (error) {
    return res.json({ message: "Internal Server Erroe", sucess: false, status: 404 });
    
  }
};




export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: "All Fields are required",
      success: false,
      status: 400,
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
        status: 404,
      });
    }

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return res.json({
        message: "Password does not match. Try again",
        success: false,
        status: 400,
      });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    console.log("User Logged In:", user);
    return res.json({
      message: "Login Successfully",
      success: true,
      status: 200,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
      success: false,
      status: 500,
    });
  }
};
