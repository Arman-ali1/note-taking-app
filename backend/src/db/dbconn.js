import mongoose from "mongoose";
const dbconn=async function(){
    try {
        await mongoose.connect("mongodb://localhost:27017/chatapp");
        console.log("mongodb connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default dbconn