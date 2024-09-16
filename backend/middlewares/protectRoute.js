import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // vezmeme token

        if(!token) return res.status(401).json({ message: "Unauthorized" }); //kdyz tady neni token tak to znamena ze nejsme prihlaseni(Unauthorized)

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // kdyz je token tak ho overime(verify)

        const user = await User.findById(decoded.userId).select("-password"); // a dostaneme userId z databaze kdyz user existuje to znamena ze pozadavek byl succesful

        req.user = user; // v request predame toho usera a zavolame dalsi funkci followUnfullowUser

        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
		console.log("Error in protectRoute: ", err.message); 
    }

}

export default protectRoute;