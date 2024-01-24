const express = require("express");
const { connectDB } = require("./db/db.js"); 
const app = express();
const port = process.env.PORT 
const bodyParser = require("body-parser");
const authRegisterRout = require("./routes/auth.js")
const cors = require("cors")

app.get("/", (req, res) => {
    res.send("hello server side");
});

app.use(cors());

app.use(bodyParser.json());

app.use(authRegisterRout)


app.use("/api", require("./routes/question"));
app.use("/api", require("./routes/quiz"));


connectDB();    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

