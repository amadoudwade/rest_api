import mongoose from "mongoose";

const dbConnect = ( ) => {
    mongoose.connect(process.env.REST_API_DATABASE, {
        dbName: process.env.DBNAME
    }).then(() => {
        console.log("Connected to database ...");
    }).catch((e) => {
        console.log(`Error connecting to database ${e}`);
    })
 }
 
 export default dbConnect