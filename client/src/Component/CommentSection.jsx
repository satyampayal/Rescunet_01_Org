import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsOfCase, postComment, editComment, deleteComment } from "../redux/slices/commentSlice";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { FaEdit, FaTrash, FaReply } from "react-icons/fa";

const SOCKET_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://rescunet-01-org-4.onrender.com";
const socket = io(SOCKET_URL); // Connect to backend

const CommentSection = ({ caseId }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, data } = useSelector((state) => state.auth);
    const userId=data._id
    const { commentList, loading } = useSelector((state) => state?.comment || {});
    const [commentText, setCommentText] = useState("");
    const [editMode, setEditMode] = useState(null);
    const [replyMode, setReplyMode] = useState(null);
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        if (caseId) {
            dispatch(getCommentsOfCase({ caseId }));
        }
        socket.on("new-comment", () => {
            dispatch(getCommentsOfCase({ caseId }));
        });
        return () => {
            socket.off("new-comment");
        };
    }, [dispatch, caseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        if (!isLoggedIn) {
            toast.error("Please login to add a comment!");
            return;
        }
        try {
            await dispatch(postComment({ caseId, comment: commentText }));
            socket.emit("new-comment", { caseId });
            toast.success("Comment added successfully!");
            setCommentText("");
        } catch (error) {
            toast.error("Failed to add comment!");
        }
    };

    const handleEdit = async (commentId) => {
        if (!commentText.trim()) return;
        await dispatch(editComment({ commentId, comment: commentText,caseId }));
        setEditMode(null);
        toast.success("Comment updated!");
    };

    const handleDelete = async (commentId) => {
        await dispatch(deleteComment({commentId,caseId}));
        toast.success("Comment deleted!");
    };

    const handleReply = async (commentId) => {
        if (!replyText.trim()) return;
        await dispatch(postComment({ caseId, parentId: commentId, comment: replyText }));
        setReplyMode(null);
        toast.success("Reply added!");
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-3">Comments</h2>
            {loading && <p className="text-gray-500">Loading comments...</p>}
            {!commentList?.length && <p className="text-gray-500">Be the first to comment!</p>}
            
            <div className="space-y-3">
                {commentList?.map((comment) => (
                    <div key={comment._id} className="p-3 bg-gray-100 rounded-lg relative">
                        {editMode === comment._id ? (
                            <textarea
                                className="w-full border p-2 rounded-lg"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                        ) : (
                            <p className="text-sm font-medium">{comment?.comment}</p>
                        )}
                        <p className="text-xs text-gray-500">By {comment?.userId?.firstName}</p>
                        {userId === comment?.userId?._id && (
                            <div className="absolute top-2 right-2 flex gap-2">
                                {editMode === comment._id ? (
                                    <button className="text-blue-500 text-sm" onClick={() => handleEdit(comment._id)}>Save</button>
                                ) : (
                                    <FaEdit className="text-blue-500 cursor-pointer" onClick={() => { setEditMode(comment._id); setCommentText(comment.comment); }} />
                                )}
                                <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(comment._id)} />
                            </div>
                        )}
                        <button className="flex items-center text-sm text-blue-500 mt-2" onClick={() => setReplyMode(replyMode === comment._id ? null : comment._id)}>
                            <FaReply className="mr-1" /> Reply
                        </button>
                        {replyMode === comment._id && (
                            <div className="mt-2">
                                <textarea
                                    className="w-full border p-2 rounded-lg"
                                    placeholder="Write a reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <button className="mt-1 bg-blue-500 text-white py-1 px-3 rounded-lg" onClick={() => handleReply(comment._id)}>
                                    Reply
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <form onSubmit={handleSubmit} className="mt-3">
                <textarea
                    className="w-full border p-2 rounded-lg"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg"
                >
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default CommentSection;
