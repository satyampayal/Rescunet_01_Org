import mongoose, { model, Schema } from "mongoose";

const userVerifaicationSchema=new Schema({
    userId:String,
    uniqueString:String,
    createdAt:Date,
    expiresAt:Date,
})

const UserVerification=model("UserVerifivation",userVerifaicationSchema);

export default  UserVerification;