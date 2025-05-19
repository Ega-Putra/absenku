import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to mongodb ${conn.connection.host}`)
    } catch (error){
        console.log(error)
        process.exit(1)
    }
}
const absenSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
},{
    timestamps: true
})
const Absen = mongoose.model('Absen',absenSchema)
export default Absen