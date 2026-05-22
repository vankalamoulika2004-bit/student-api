const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const {
  addStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  register,
  login
} = require("../controllers/userController");


// CRUD ROUTES
router.post("/students/add", addStudent);

router.get("/students", getStudents);

router.get("/students/:id", getSingleStudent);

router.put("/students/update/:id", updateStudent);

router.delete("/students/:id", deleteStudent);


// AUTH ROUTES
router.post("/register", register);

router.post("/login", login);


// PROTECTED ROUTE EXAMPLE
router.get("/protected", verifyToken, (req, res) => {

  res.send("Protected Route Accessed");

});


module.exports = router;