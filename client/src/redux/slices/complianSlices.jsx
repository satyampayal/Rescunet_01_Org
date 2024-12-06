import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosIns";
import toast from "react-hot-toast";

let initialState={
    complainsList:[],
    myComplaints:[],
    searchComplainList:[],
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

export const getAllMyComplains=createAsyncThunk('/complain/get/my',async ()=>{
    try {
        const response=axiosInstance.get('complain/get/my');
        return await response;
    } catch (error) {
        console.log(error?.message)
        
    }
})

export const deleteMyComplain=createAsyncThunk('/complain/delete',async (data)=>{
    try {
        console.log(data)
        // :postedBy/:postId
        const response=axiosInstance.delete(`complain/delete/by/user/${data?.postedBy}/${data.postId}`,data);
        toast.promise(response,{
            loading:"wait for deleting complain",
            success:(data)=>{
                return data?.data?.message
            },
            error:"please try again "
        })
    } catch (error) {
         toast.error(error?.message ||"some issue please try again")
    }
})

export const searchComplain=createAsyncThunk('/complain/search',async (searchParams)=>{
    try {
        const response=axiosInstance.get('complain/search',{params:searchParams})
        return await response;
        
    } catch (error) {
        console.log(error?.message)
        
    }
})

export const getComplainByComplainId=createAsyncThunk('/complain/getById',async ({complainId})=>{
       try {
        const response =axiosInstance.get(`complain/get/${complainId}`);
        return await response;
       } catch (error) {
          console.log(error)
       }
})
const complainSlice=createSlice({
    name:'complain',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllComplains.pending, (state,action)=>{
            state.loadList=true;
            state.complainsList=action?.payload?.data?.complains;
        })
        builder.addCase(getAllComplains.fulfilled, (state,action)=>{
            state.loadList=false;
            state.complainsList=action?.payload?.data?.complains;
        })
        .addCase(getAllMyComplains.fulfilled,(state,action)=>{
            state.myComplaints=action?.payload?.data?.complains;
        })
        .addCase(searchComplain.pending,(state,action)=>{
            state.loadList=true;
        })
        .addCase(searchComplain.fulfilled,(state,action)=>{
            state.loadList=false
            state.searchComplainList=action?.payload?.data?.data;
        })
        .addCase(getComplainByComplainId.pending,(state,action)=>{
            state.loadList=true
        })
        .addCase(getComplainByComplainId.fulfilled,(state,action)=>{
            state.loadList=false
        })
       
    }
    
})

export default complainSlice.reducer;