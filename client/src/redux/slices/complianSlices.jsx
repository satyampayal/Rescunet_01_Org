import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosIns";
import toast from "react-hot-toast";

let initialState={
    complainsList:[],
    loadList:false
}

export const  registerComplain=createAsyncThunk('/complain/register', async (data)=>{

    try {
         console.log(data)
        const response=  axiosInstance.post('complain/register',data);
        toast.promise(response,{
            loading:"processing ",
            success:(data)=>{
                return data?.data?.message
            },
            error:'try again'
        })
        return await response;

    } catch (error) {
        toast.error(error?.message)
        
    }

})

export const getAllComplains=createAsyncThunk('/complain/get',async ()=>{
    try {
        const response=axiosInstance.get('complain/get');
        return await response;
    } catch (error) {
        console.log(error?.message)
        
    }
})
const complainSlice=createSlice({
    name:'complain',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllComplains.fulfilled, (state,action)=>{
            console.log(action)
            state.loadList=true;
            state.complainsList=action?.payload?.data?.complains;
        })
       
    }
    
})

export default complainSlice.reducer;