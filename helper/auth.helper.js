import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';
export const hashYourPassword=async(password)=>{
       try {
        const saltRounds=10;
        const hashedPassword=bcrypt.hash(password,saltRounds);
        return hashedPassword
       } catch (error) {
        console.log("error while hashing your password")
       }
}

 export const comparePassword=async(password,hashedPassword)=>{

    try {
       const isMatch=bcrypt.compare(password,hashedPassword);
       return isMatch ;
    } catch (error) {
        console.log("error while comparing your password")
    }
}

export const generateJWToken=(userId,res)=>{
   try {
    const token = JWT.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:'15d'});
    res.cookie("JWT",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS cross-site scripting attacks
        nameSite:"strict"// CSRF attacks cross-site scripting requests forgery protection
        
    })
   } catch (error) {
        console.log("error while generating JW token")
   }
}