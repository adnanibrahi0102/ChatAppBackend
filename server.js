import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoute from './routes/auth.routes.js'
import connectDB from "./config/db.js";
import messagesRoute from './routes/message.route.js'
import usersRoute from './routes/users.routes.js'

const app=express();
//middlewares
dotenv.config()
const PORT=process.env.PORT ||5000;
app.use(express.json())
app.use(cookieParser());

//route for auth routes
app.use('/api/v1/auth',authRoute);
// route for messages routes
app.use('/api/v1/messages',messagesRoute)

//route for user routes
app.use('/api/v1/users',usersRoute);
app.get('/', (req, res) => {
    res.send('<h1>Hello world !</h1>')
});


app.listen(PORT,()=>{
    connectDB();
    console.log(`listening on port ${PORT}`)
})