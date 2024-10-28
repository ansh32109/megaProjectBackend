// require('dotenv').config({
//     path: './env'
// })

import dotenv from 'dotenv'
import connectToDB from './db/index.js';

dotenv.config({
    path: ('./.env')
})

connectToDB()
.then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => console.log(err))



// import express from 'express'

// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.log("ERR: ", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port: ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERROR", error);
//         throw error;
//     }
// })()
