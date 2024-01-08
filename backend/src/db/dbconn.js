import mongoose from "mongoose";
const dbconn=async function(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("mongodb connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default dbconn