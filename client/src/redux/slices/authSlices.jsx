import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axiosInstance from "../../config/axiosIns";
import toast from "react-hot-toast";
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    data:localStorage.getItem('data') || {}
}

export const createAccount=createAsyncThunk('/auth/signup',async (data)=>{
    try {
        console.log(data);
        const response=axiosInstance.post('user/register',data);
        toast.promise(response,{
            loading:"wait for creating your account",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to create your account try Again"
        })
    } catch (error) {
         toast.error(error.message);
    }

});


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    // extraReducers:(builder)=>{
    //     builder.addCase()
    // }
})

export default authSlice.reducer;