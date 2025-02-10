import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosIns"

let initialState={
    commentList:[],
    loading:false,
}


export const  postComment=createAsyncThunk('/comment/add',async (data)=>{
    try{
        console.log(data)
        const response=axiosInstance.post(`comment/add/${data.caseId}`,{"comment":data?.comment});
        console.log("ADD COMMENT RESPONSE-->  "+response );
        return await response;
    }catch(error){
        consoel.log("Error in add comment in the CommentSlice")
    }
})

export const getCommentsOfCase=createAsyncThunk('/comment/get',async (data)=>{
    try {
        console.log(data)
        const response=axiosInstance.get(`comment/get/${data?.caseId}`);
        return await response;

        
    } catch (error) {
        consoel.log("Error to get comment in the CommentSlice")
        
    }
})


const commentSlice=createSlice({
    name:'comment',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(postComment.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(postComment.fulfilled,(state,action)=>{
            state.commentList.push(action?.payload?.data?.data)
            state.loading=false;
            console.log(action)
        })
        builder.addCase(getCommentsOfCase.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getCommentsOfCase.fulfilled,(state,action)=>{
            state.commentList=action?.payload?.data?.data
            state.loading=false;

            console.log(action)

        })
    }
})

export default commentSlice.reducer;