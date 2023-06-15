const express = require("express");
const errorHandler = require("./middleware/errorHandler ");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();


connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://backendalphaitsystems.postman.co');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json());

app.use("/api/contacts", require('./routes/contactsRoute'));

app.use(errorHandler);


app.listen(PORT, () => console.log('Listening to port:', PORT));