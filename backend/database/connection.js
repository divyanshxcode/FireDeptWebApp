import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Fire_Dept_WebApp"
    }).then(()=>{
        console.log("Connected to database.")
    }).catch(err=>{
        console.log(`Some error occured while connecting to database: ${err}`)
    })
}