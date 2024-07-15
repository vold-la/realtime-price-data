import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const DB_URI: any = process.env.DB_URI;
if(!DB_URI){
    throw new Error("DB URI is not present");
}

export async function connectDataBase() {
    try {
        await mongoose.connect(DB_URI);
        console.log("connected to database")
    } catch (error) {
        console.log('Error connectig to database:', error);
    }
}