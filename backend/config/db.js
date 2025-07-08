import mongoose from "mongoose";

const connectDB = async () => {

    try {
        mongoose.connection.on('connected', () => {
            console.log('Database Conntected')
        })

        await mongoose.connect(`${process.env.MONOGODBURL}/interviewPrepApp`)

    } catch (error) {
        console.error("Error connecting to MonogoDB", error)
    }

}


export default connectDB;