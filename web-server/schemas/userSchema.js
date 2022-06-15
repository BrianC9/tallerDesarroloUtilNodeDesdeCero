import mongoose from "mongoose";


const userScheema = mongoose.Schema({
    _id: String,
    name: String,
})

const userModel = mongoose.model('User', userScheema)

export default userModel;