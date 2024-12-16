const express = require("express");
const router = express.Router();
const {
    getStudentForm,
    addOrEditStudent,
    getStudentList,
    getStudentById,
    deleteStudent
} = require("../controllers/studentController");

// Apply authentication middleware to routes that require authentication
router.get("/", getStudentForm);
router.post("/", addOrEditStudent);
router.get("/list", getStudentList);
router.get("/:id", getStudentById);
router.get("/delete/:id", deleteStudent);

module.exports = router;
