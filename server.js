const express = require("express");
const dotenv = require("dotenv").config();



const app = express();

const PORT = process.env.PORT || 5000;

app.use("/api/contacts", require('./routes/contactsRoute'));


app.listen(PORT, () => console.log('Listening to port:', PORT));