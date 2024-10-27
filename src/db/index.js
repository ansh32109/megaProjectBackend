import mongoose, { mongo } from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n DB connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed, ERR: ", error);
        process.exit(1)
    }
}

export default connectToDB;