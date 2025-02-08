import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosIns";
import toast from "react-hot-toast";

let initialState={
    sharedList:[],
    loadList:false
}

export const shareComplain=createAsyncThunk('/share/complain', async (data)=>{
    try {
        console.log(data)
       const response=  axiosInstance.post('share/share-log',data);
       toast.promise(response,{
           loading:"sharing  ",
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

const shareSlice=createSlice({
    name:'share',
    initialState,
    reducers:{},
})

export default shareSlice.reducer;
