import { User } from "../models/user.js";
import  bcrypt  from "bcrypt"


export const AddUser = async (req, res, next) => {

    try {
        const { email, first_name, last_name, password } = req.body
        
        
        const isExistUser = await User.findOne({
            email: email
        })
        
        if (isExistUser) {
            return res.status(400).json({ msg: "Cet utilisateur existe déjà!" })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        await new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashpassword,
            
        }).save()
        res.status(201).json({ msg: "Utilisateur ajouté!" })
        

    } catch (error) {
        console.log(error);
        
        return res.send({error})
    }
      
}


export const GetAllUsers = (req, res, next) => {
    const AllUsers = User.find()

    AllUsers.then( (users) => res.status(200).json(users) )

    .catch((error) => res.status(400).json({Error:error}))

}

export const GetOneUser = (req, res, next) => {
    const OneUser = User.findOne({_id: req.params.id})

    OneUser.then( (user) => res.status(200).json(user) )

    .catch((error) => res.status(400).json({Error:error}))

}

export const DeleteOneUser = (req, res, next) => {

    const OneUser = User.deleteOne({_id: req.params.id})

    OneUser.then( () => res.status(200).json({Message: "User deleted"}) )

    .catch((error) => res.status(400).json({Error:error}))
}

export const UpdateOneUser = (req, res, next) => {

    const OneUser = User.updateOne({_id: req.params.id, first_name: req.body, last_name: req.body, email: req.body, password: req.body, role: req.body})

    OneUser.then( () => res.status(200).json({Message: "User updated"}) )

    .catch((error) => res.status(400).json({Error:error}))
}
