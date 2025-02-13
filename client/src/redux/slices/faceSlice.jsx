
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

const faceSlice=createSlice({
  name:'face',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{

  }
})

export default faceSlice.reducer;