import mongoose from "mongoose";

const connectDB = async() => {
   await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex: true
    })
    .then(()        =>{
        console.log(`Database connected success!`)
    }).catch((err)  =>{
        console.log(`Cannot Connect to the database!`,err)
        process.exit()
    });
}
export default connectDB