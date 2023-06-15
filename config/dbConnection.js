const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);

        console.log(
            "db connected",
             connect.connection.host,
             connect.connection.name
        )

    } catch(err) {
        console.log(error);
        process .exit(1);
    }
};

module.exports = connectDB;