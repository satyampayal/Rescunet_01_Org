import { Comment } from "../model/comment.model.js";
import Complain from "../model/complain.model.js";

const  addComment=async (req,res)=>{
     const id=req.user?.id;
     if(!id){
        return res.status(400).json({success:false,message:"Unauthorised user "})
     }
     const caseId=req.params?.caseId;
     if(!caseId){
        return res.status(400).json({success:false,message:"wrong url send "})

     }
    const {comment}=req.body;
    console.log(id,caseId,comment)
    if(!comment){
        return res.status(400).json({success:false,message:"Please add comment  "})
    }
    const newComment=await  Comment.create({comment,userId:id,caseId:caseId})
    if(!newComment){
        return res.status(500).json({success:false,message:"Comment not add ,try again  "})
    }
    await newComment.save();
    res.status(200).json({success:true,message:"Comment add succesFully ",data:newComment})

}

const getCommentsOfCase=async (req,res)=>{
    // const id=req.user.id;
    //  if(!id){
    //     return res.status(400).json({success:false,message:"Unauthorised user "})
    //  }
     const {caseId}=req.params;
     if(!caseId){
        return res.status(400).json({success:false,message:"wrong url send "})

     }
     if(caseId.length!=24){
        return res.json({
          success: false,
          message: "Complain Id Not Found",
        });
      }
     const caseExists=await Complain.findById({_id:caseId})
     if(!caseExists){
        return res.status(400).json({success:false,message:"Complain Not exists"})

     }

     const getComments=await Comment.find({caseId}).populate("userId" )
     if(!getComments){
        return res.status(500).json({success:false,message:"Comment not get ,try again  "})
        
     }
     return res.status(200).json({success:true,message:"Get Comment successfully  ",data:getComments})
     
}

const editComment=async (req,res)=>{
    try{
        const id=req.user.id;
        if(!id){
           return res.status(400).json({success:false,message:"Unauthorised user "})
        }
        const {caseId}=req.params;
        if(!caseId){
           return res.status(400).json({success:false,message:"wrong url send "})
   
        }
        if(caseId.length!=24){
           return res.json({
             success: false,
             message: "Complain Id Not Found",
           });
         }
        const caseExists=await Complain.findById({_id:caseId})
        if(!caseExists){
           return res.status(400).json({success:false,message:"Complain Not exists"})
        }
        const {commentId}=req.params;
        if(!commentId){
            return res.status(400).json({success:false,message:"Wrong url send"})
        }
        const {comment}=req.body;
        if(!comment){
            return res.status(400).json({success:false,message:"Please add comment "});
        }
        const commentExists=await Comment.findById({_id:commentId})
        if(!commentExists){
            return  res.staus(400).json({success:false,message:"Comment not exists"})
        }
        commentExists.comment=comment;
        await commentExists.save();
        res.status(200).json({success:true,message:"Comment edit successfully",data:commentExists})
    }catch(error){
        console.log(error+"Error in edit comment");
        res.status(500).json({success:false,message:"Erro in edit comment "})
    }
}

const deleteComment=async (req,res)=>{
    try{
        const id=req.user.id;
        if(!id){
           return res.status(400).json({success:false,message:"Unauthorised user "})
        }
        const {caseId}=req.params;
        if(!caseId){
           return res.status(400).json({success:false,message:"wrong url send "})
   
        }
        if(caseId.length!=24){
           return res.json({
             success: false,
             message: "Complain Id Not Found",
           });
         }
        const caseExists=await Complain.findById({_id:caseId})
        if(!caseExists){
           return res.status(400).json({success:false,message:"Complain Not exists"})
        }
        const {commentId}=req.params;
        if(!commentId){
            return res.status(400).json({success:false,message:"Wrong url send"})
        }
      
        const commentExists=await Comment.findByIdAndDelete({_id:commentId})
        if(commentExists){
            return  res.staus(400).json({success:false,message:"Comment  not deleted ,try again"})
        }
       
        res.status(200).json({success:true,message:"Comment edit successfully",data:commentExists})
    }catch(error){
        console.log(error+"Error in edit comment");
        res.status(500).json({success:false,message:"Error in delete comment "})
    }
}


export {addComment,getCommentsOfCase,editComment,deleteComment}
