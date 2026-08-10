import express from "express"
import cors from "cors"
import userRoute from './routes/user.route'
import categoryRoute from './routes/category.route'
import eventRoute from './routes/event.route'
import bookingRoute from './routes/booking.route'
const app=express()
app.use(cors())
app.use(express.json())


app.use("/api/users",userRoute)

app.use("/api/categories",categoryRoute)

app.use("/api/events",eventRoute)

app.use("/api/bookings",bookingRoute)

app.get("/",async(req,res)=>{
    res.status(200).json({
        "success":true,
        "message":"Hello World"
    })
})

export default app;