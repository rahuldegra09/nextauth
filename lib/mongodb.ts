import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please provide a MongoDB connection string in the environment variable MONGODB_URI');
}
export const connectToMongoDB =async() =>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("connecto in mongo db")
        
    } catch (error) {
        console.log("not connected",error);
    }
}