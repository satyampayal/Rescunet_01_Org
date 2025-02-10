import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsOfCase, postComment } from "../redux/slices/commentSlice";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const SOCKET_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://rescunet-01-org-4.onrender.com";
const socket = io(SOCKET_URL); // Connect to backend
const CommentSection = ({ caseId, userId }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { commentList, loading } = useSelector((state) => {
        return state?.comment || {}; // Ensuring default value
    }
    );
    const [commentText, setCommentText] = useState("");
    useEffect(() => {
        if (caseId) {
            dispatch(getCommentsOfCase({ caseId }));
        }

        socket.on("new-comment", (commentData) => {
            dispatch(getCommentsOfCase({ caseId }))
        })
        return () => {
            socket.off("new-comment");
        };
    }, [dispatch, caseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            caseId,
            comment: commentText,
        };
   console.log(isLoggedIn)
   if(!isLoggedIn) {
    toast.error("Please login to add comment!")
    return ;
}
            try {
                await dispatch(postComment(newComment));
                toast.success("Comment added successfully!");
                socket.emit("new-comment", newComment);

                setCommentText(""); // Clear input
            } catch (error) {
                toast.error("Failed to add comment!");
            }
       
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3">Comments</h2>

            {/* Show loading state */}
            {loading && <p className="text-gray-500">Loading comments...</p>}

            {/* Display comments */}
            {
                commentList?.length === 0 && <p className="p-3 text-xl text-gray-500">You are the first to comment</p>
            }
            <div className="space-y-3">
                {commentList?.map((comment) => (
                    <div key={comment._id} className="p-3 bg-gray-100 rounded-lg">
                        <p className="text-sm font-medium">{comment?.comment}</p>
                        <p className="text-xs text-gray-500">By User {comment?.userId?.firstName}</p>
                    </div>
                ))}
            </div>

            {/* Comment Input */}
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
