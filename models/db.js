const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/StudentDB").then(() => {
    console.log("Connection Succeeded");
}).
    catch((err) => {
        console.error("Error in Connection" + err);
    });

require("./student.model");

module.exports = mongoose;