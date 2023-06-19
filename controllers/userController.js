const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    console.log(req.body)
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields required.');
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email already in use.");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashed passwird:', hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword

    });

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error(' invalid user data!');
    }

    res.json({ message: 'register user controller' });
});


const loginUser = asyncHandler(async (req, res) => {
    // try{
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('All fields required.');
    }

    const user = await User.findOne({ email });
    //if user not exist than return status 400

    if (!user) return res.status(400).json({ msg: "User not exist" })

    //if user exist than compare password
    //password comes from the user
    //user.password comes from the database
    bcrypt.compare(password, user.password, (err, data) => {
        //if error than throw error
        if (err) {
            res.status(400);
            throw new Error(err);
        }

        //if both match than you can do anything
        if (data) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" }
            );
            return res.status(200).json({ accessToken })
        } else {
            return res.status(401).json({ msg: "Invalid credencial" })
        }

    })


});

//private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {
    registerUser,
    loginUser,
    currentUser
};