const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/test_db");


app.use('/api', require('./routes/api'));

// const userRoute = require('./routes/user')
// const contactRoute = require('./routes/contact')

// app.use("/user",userRoute)
// app.use("/contacts", contactRoute)

app.listen(PORT, () => {
console.log("Listen on port " + PORT);
});



