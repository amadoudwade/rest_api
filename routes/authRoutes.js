import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import { GetAllUsers } from "../controllers/userControllers.js";
import { GetOneUser } from "../controllers/userControllers.js";
import { DeleteOneUser } from "../controllers/userControllers.js";
import { UpdateOneUser } from "../controllers/userControllers.js";


const AuthRoute = express.Router()

// User registration
AuthRoute.post('/register', async (req, res) => {
    try {
    const { first_name, last_name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ first_name, last_name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    
    } catch (error) {
    res.status(500).json({ error, msg: 'Registration failed' });
    
    }
    });

AuthRoute.get(`/`, GetAllUsers)

AuthRoute.get(`/:id`, GetOneUser)

AuthRoute.delete(`/:id`, DeleteOneUser)

AuthRoute.put(`/:id`, UpdateOneUser)



export default AuthRoute