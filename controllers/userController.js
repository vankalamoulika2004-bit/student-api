const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ADD STUDENT
const addStudent = async (req, res) => {

  try {

    const user = new User(req.body);

    await user.save();

    res.send(user);

  } catch (err) {

    res.send(err);

  }
};


// GET ALL STUDENTS
const getStudents = async (req, res) => {

  try {

    const users = await User.find();

    res.send(users);

  } catch (err) {

    console.log(err);

  }
};


// GET SINGLE STUDENT
const getSingleStudent = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    res.send(user);

  } catch (err) {

    console.log(err);

  }
};


// UPDATE STUDENT
const updateStudent = async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.send(user);

  } catch (err) {

    console.log(err);

  }
};


// DELETE STUDENT
const deleteStudent = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.send("User Deleted");

  } catch (err) {

    console.log(err);

  }
};


// REGISTER
const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.send("User Already Exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword
    });

    await user.save();

    res.send("Registration Successful");

  } catch (err) {

    console.log(err);

  }
};


// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User Not Found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Invalid Password");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send({
      message: "Login Successful",
      token
    });

  } catch (err) {

    console.log(err);

  }
};


module.exports = {
  addStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  register,
  login
};