require("./models/db");

const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const studentRoute = require("./routes/studentRoute");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
    <h2>Welcome to Students DataBase </h2>
    <h3>Click here to get access to the <b> <a href="/student/list"> Database </a> </b> </h3>   
    `);
});

app.set("views", path.join(__dirname, "/views/"));

app.engine("hbs", exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultLayout: "MainLayout",
    layoutsDir: __dirname + "/views/layouts/"
}));

app.set("view engine", "hbs")

app.use("/student", studentRoute);

app.listen(2007, () => {
    console.log("The server running on port 2007");
});