const bcrypt = require('bcrypt');
const User = require('../models/userModel');
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let existingUser = await User.findOne({ email: email });
        if(!existingUser) return res.status(400).send({ message: "User not found "});
        const savedPass = existingUser.password;
        let verdict = bcrypt.compare(password, savedPass);
        if(verdict) res.redirect('/');
        return res.status(400).send("Incorrect credentials");
    } catch (error) {
        console.error(error);
    }
}
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let existingUser = await User.findOne({ email: email });
        if(existingUser) return res.status(400).send("User with this email already exists");
        const hashedPassword = bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        let verdict = await newUser.save();
        if(verdict) res.redirect('/');
        return res.status(400).send("could not sign up");
    } catch (error) {
        console.error(error);
    }
}