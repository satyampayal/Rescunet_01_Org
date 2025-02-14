
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axiosInstance from "../../config/axiosIns";
import toast from "react-hot-toast";
const initialState = {
  faceList: [],
};


export const postFaceData=createAsyncThunk('/face/post',(data)=>{
  try {
    console.log(data)
    const response=axiosInstance.post('face/add',data)
    toast.promise(response,{
      loading:'face features add ...',
      success:'face features add successfully',
      error:'something wrong,try again'
    }
      )
  } catch (error) {
    console.log(error.message)
    toast.error("try again") 
  }

})

export const getAllface=createAsyncThunk('/face/get',async ()=>{
  try {
    const response=await axiosInstance.get('face/get');
    console.log(response)
    return await response;
  } catch (error) {
     console.log("Error with get all faces");
     console.log(error.message);
  }
})

const faceSlice=createSlice({
  name:'face',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getAllface.fulfilled,(state,action)=>{
      console.log(action)
      state.faceList=action?.payload?.data?.data;
    })

  }
})

export default faceSlice.reducer;