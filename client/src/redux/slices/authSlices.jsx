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

export const loginAccount=createAsyncThunk('/auth/login',async (data)=>{
    try {
        const response=axiosInstance.post('/user/login',data);
        toast.promise(response,{
            loading:"wait for login",
            success:(data)=>{
                return data?.data?.message;
            },
            error:'please try again '
        })
    return await response;

    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }

})

export const  logoutAccount=createAsyncThunk('/auth/logout',()=>{
    try {
        const response=axiosInstance.get('/user/logout');
        toast.promise(response,{
            loading:"wait for logeed Out ",
            success:(data)=>{
                return data?.data?.message
            }
        })
    } catch (error) {
        toast.error("try again ")
    }
})


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loginAccount.fulfilled,(state,action)=>{
            console.log(action);
            localStorage.setItem('isLoggedIn',true);
            localStorage.setItem('data',JSON.stringify(action?.payload?.data?.user))
            state.data=action?.payload?.data?.user;
            state.isLoggedIn=true;
        })
        .addCase(logoutAccount.fulfilled,(state,action)=>{
           localStorage.clear();
            state.data={};
            state.isLoggedIn=false;
        })
    }
})

export default authSlice.reducer;