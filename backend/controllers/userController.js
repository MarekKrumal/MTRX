import User from "../models/userModel.js"
import Post from "../models/postModel.js";
import bcrypt from "bcryptjs"
import mongoose from "mongoose";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary} from "cloudinary";


const getUserProfile = async (req, res) =>{
	//fetchneme profil budto pomoci username nebo userId
	//query je budto usernmae nebo userID
	
	const { query } = req.params;
	try {
		let user;
		//jestli query je userId
		if(mongoose.Types.ObjectId.isValid(query)){
			user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
		} else {
		// query je username
			user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
		}

		if(!user) return res.status(400).json({ error: "User not found" });
		
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message});
		console.log("Error in getUserProfile: ", err.message);
	}
}


const signupUser = async(req,res) => {
    try {
        const {name,email,username,password} = req.body;
        const user = await User.findOne({$or:[{ email },{ username }]});

        if (user) {
			return res.status(400).json({ error: "User already exists" });
		}

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword
        });
        await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
          
            res.status(201).json({
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              username: newUser.username,
			  bio: newUser.bio,						//dopsano po praci s UpdateProfilePage
			  profilePic: newUser.profilePic,		//dopsano po praci s UpdateProfilePage
            });
          } else {
            res.status(400).json({ error: "Invalid user data" });
          }
          



    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in signupUser: ", error.message)
    }
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			bio: user.bio,						//dopsano po praci s UpdateProfilePage
			profilePic: user.profilePic,		//dopsano po praci s UpdateProfilePage
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginUser: ", error.message);
	}
};

const logoutUser = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const followUnFollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
}

const updateUser = async (req, res) => {
	const { name, email, username, password, bio} = req.body;
	let { profilePic } = req.body;

	const userId = req.user._id;
	try {
		let user = await User.findById(userId)
		if (!user) return res.status(400).json({ error: "User not found" });

		if(req.params.id !== userId.toString()) return res.status(400).json({ error: "You cannot update other users profile" });

		if(password){
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		if(profilePic){
			if(user.profilePic){
				await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]) //kdyz uz user ma profilePic prvni smazeme starou profilePic z cloudinary
			}
			const uploadedResponse = await cloudinary.uploader.upload(profilePic); //kdyz posleme obrazek pres client uplodneme ho do cloudinary, ten vrati object ktery bude mit secure_url field
			profilePic = uploadedResponse.secure_url;
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio || user.bio;

		user = await user.save();

		// password by melo byt null (nemeli bychom ho posilat pri updejtu profilu[bio, ProfilePic])
		user.password = null;

		res.status(200).json(user);

	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in updateUser: ", err.message);
	}

}

export { signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile }