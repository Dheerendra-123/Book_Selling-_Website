import cookieParser from 'cookie-parser';
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './Routes/userRoutes.js'
import formRoutes from './Routes/formRoutes.js'
const PORT=process.env.PORT;

const app=express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH","PUT"],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));



// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const ConnectDB=async()=>{
    try{
    await mongoose.connect(process.env.Mango_URI,{
        dbName:'chatApplication'
    })
    console.log("MongoDB Connected Sucessfully");
    }catch(error){
        console.log(error);
    }
}

ConnectDB();

app.get('/',(req,res)=>{
    res.json({message:"This is deafu;t route",sucess:true});
});

app.use('/api/user',userRouter)
app.use('/api/books',formRoutes)


app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)
}).on('error',(error)=>{
console.log(error);
})

