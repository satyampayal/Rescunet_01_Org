import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
  },
  dob:{
    type:String,
  },
  verified: {
    type: Boolean,
  },
});

UserSchema.pre("save",async function(){
    this.password=await bcrypt.hash(this.password,10);
})

UserSchema.methods={
    comparePassword:async function(plainPassword){
        return await bcrypt.compare(plainPassword,this.password)
    },
    generateToken:async function(){
      return await  jwt.sign({id:this._id,email:this.email},"dyucjscjshc",{
        //null
      })

    }
}

const User = mongoose.model("User", UserSchema);

export default User;
