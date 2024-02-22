import User from "../models/user.model.js";

export const getAllUsersController=async(req,res)=>{
    try {
       const loggedInUser= req.user;
       const filteredUsers= await User.find({_id:{$ne:loggedInUser}})
       if(!filteredUsers) return res.status(200).json([])
       return res.status(200).json(filteredUsers)
    } catch (error) {
        console.log(error);
        res.status(500).json({
              message:"Error while getting all users",
               success:false,
               error
        })
    }
}