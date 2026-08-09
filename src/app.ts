import express from "express"
import cors from "cors"
import userRoute from './routes/user.route'
const app=express()
app.use(cors())
app.use(express.json())


app.use("/api/users",userRoute)


app.get("/",async(req,res)=>{
    res.status(200).json({
        "success":true,
        "message":"Hello World"
    })
})

export default app;