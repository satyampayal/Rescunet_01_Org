import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosIns"

let initialState={
    commentList:[],
    loading:false,
    message:'',
}


export const  postComment=createAsyncThunk('/comment/add',async (data)=>{
    try{
        const response=axiosInstance.post(`comment/add/${data.caseId}/${data?.userId}`,{"comment":data?.comment});
        // console.log("ADD COMMENT RESPONSE-->  "+response );
        return await response;
    }catch(error){
        consoel.log("Error in add comment in the CommentSlice")
    }
})

export const getCommentsOfCase=createAsyncThunk('/comment/get',async (data)=>{
    try {
        const response=axiosInstance.get(`comment/get/${data?.caseId}`);
        return await response;

        
    } catch (error) {
        consoel.log("Error to get comment in the CommentSlice")
        
    }
})

export const editComment=createAsyncThunk('/comment/edit',async (data)=>{
    try{
        const response=axiosInstance.put(`comment/edit/${data?.caseId}/${data?.commentId}/${data?.userId}`,{"comment":data?.comment})
        return await response
    }catch(error){
        console.log("Error in edit comment in the commentSlice"+error.message)
    }
})
export const deleteComment=createAsyncThunk('/comment/delete',async (data)=>{
    try{
        const response=axiosInstance.delete(`comment/delete/${data?.caseId}/${data?.commentId}/${data?.userId}`)
        return await response
    }catch(error){
        console.log("Error in edit comment in the commentSlice"+error.message)
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
            state.commentList.shift (action?.payload?.data?.data)
            state.loading=false;
            console.log(action)
        })
        builder.addCase(postComment.rejected,(state,action)=>{
            state.message="Not add comment try again"
            state.loading=false;

        })
        builder.addCase(getCommentsOfCase.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getCommentsOfCase.fulfilled,(state,action)=>{
            state.commentList=action?.payload?.data?.data
            state.loading=false;
        })
        builder.addCase(editComment.fulfilled,(state,action)=>{
            state.commentList=state.commentList.map((comment)=>{
                if(comment._id===action?.payload?.data?.data?._id){
                    return action?.payload?.data?.data
                }
                return comment;
            })
            state.loading=false;

        })
        builder.addCase(deleteComment.fulfilled,(state,action)=>{
            state.commentList=state.commentList.filter((comment)=>comment._id!==action?.payload?.data?.data?._id)
            state.loading=false;

        })
    }
})

export default commentSlice.reducer;