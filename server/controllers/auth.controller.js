import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signupUser = async (req,res) => {
    try {
        const {username, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({'message':'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username, email, password: hashedPassword});

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({'message':'User created successfully'});
        }else{
            res.status(400).json({'message':'Invalid user data'});
        }

    } catch (error) {
        res.status(500).json({'message':'Internal Server Error'});
    }
}

export const loginUser = async (req, res) => {
	try {
		const { username,email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logoutUser = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

