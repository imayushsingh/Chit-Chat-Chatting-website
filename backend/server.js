const express= require("express");
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname,'./.env')})
const {chats} = require("./data/data");
const connectDB = require("./config/db");
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const { notFound , errorHandler} = require("./middleware/errorMiddleware");





connectDB(); 
//creating instance of express variable
const app=express();


app.use(express.json()); //to accept the json data



app.get("/",(req,res) =>{
    res.send("API is RUNNING successfully");
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT || 5000

//we created our server
app.listen(PORT,console.log(`Server started on Port ${PORT}`));