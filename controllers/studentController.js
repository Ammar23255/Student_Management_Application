const express = require("express");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const asyncHandler = require("express-async-handler");

const getStudentForm = asyncHandler(async (req, res) => {
    res.render("student/addOrEdit", {
        viewTitle: "Insert Student"
    });
});

const addOrEditStudent = asyncHandler(async (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
});

async function insertRecord(req, res) {
    try {
        const student = new Student({
            fullName: req.body.fullName,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city,
        });
        await student.save();
        res.redirect("student/list");
    } catch (err) {
        console.log("Error during insert: " + err);
    }
};


async function updateRecord(req, res) {
    try {
        await Student.findByIdAndUpdate(req.body._id, {
            fullName: req.body.fullName,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city
        });
        res.redirect("student/list");
    } catch (err) {
        console.log("Error during update: " + err);
    }
};

const getStudentList = asyncHandler(async (req, res) => {
    try {
        const docs = await Student.find(); // Use async/await for Model.find()
        res.render("student/list", {
            list: docs
        });
    } catch (err) {
        console.error("Error in retrieval: " + err);
    }
});

const getStudentById = asyncHandler(async (req, res) => {
    try {
        const doc = await Student.findById(req.params.id); // Use async/await for Model.findById()
        if (doc) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            });
        }
    } catch (err) {
        console.error("Error in retrieval: " + err);
    }
});

const deleteStudent = asyncHandler(async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id); // Use async/await for Model.findByIdAndDelete()
        res.redirect("/student/list");
    } catch (err) {
        console.error("Error in deletion: " + err);
    }
});


module.exports = {
    getStudentForm,
    addOrEditStudent,
    getStudentList,
    getStudentById,
    deleteStudent
};