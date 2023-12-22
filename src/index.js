// require('dotenv').config({path : './env'})

import dotenv from "dotenv"

// import mongoose, { connect } from "mongoose"
// import {DB_NAME} from "./constants"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path : './.env'
})

const PORT = process.env.PORT || 8000 

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(` Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err)
})



















// import express  from "express"

// const app = express()

// (async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error" , (error) => {
//             console.log("ERROR : " , error)
//             throw error
//         })

//         app.listen(process.env.PORT , () => {
//             console.log(`App is listening on port ${process.env.PORT}` )
//         })        

//     } catch (error) {
//         console.log("ERROR : " , error )
//         throw err
//     }
// })()

