import React, { useEffect, useState } from "react";
import "./ManageComment.css";
import { useAdminContext } from "../../context/AdminContext";

const ManageComment = () => {
  const {
    fetchComments,
    updateCommentApproval,
    allComments,
    admin
  } = useAdminContext();

   useEffect(()=>{
      document.title = "Admin | Manage Comments"
    },[])
  

useEffect(() => {
  const loadComments = async () => {
    try {
      if (admin) {
        const fetched = await fetchComments();
        console.log("✅ Loaded comments:", fetched);
      }
    } catch (err) {
      console.error("❌ Error loading comments:", err.message);
    }
  };

  loadComments();
}, [fetchComments, admin]); 



  const toggleApproval = (comment) => {
    updateCommentApproval(comment.id, comment.path, comment.approved);
  };

  const groupByBlogId = (commentsList) => {
    return commentsList.reduce((acc, comment) => {
      const { blogId } = comment;
      if (!acc[blogId]) acc[blogId] = [];
      acc[blogId].push(comment);
      return acc;
    }, {});
  };


  const grouped = groupByBlogId(allComments);

  return (
    <div className="manage-comment-container">
      <h2>Manage Comments</h2>
      {Object.entries(grouped).map(([blogId, blogComments]) => (
        <div key={blogId} className="blog-section">
          <h3>Blog Title: {blogComments[0]?.blogTitle || blogId}</h3>
          {blogComments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p><strong>Name:</strong> {comment.name}</p>
              <p><strong>Email:</strong> {comment.email}</p>
              <p><strong>Comment:</strong> {comment.comment}</p>
              {comment.createdAt && (
                <p>
                  <strong>Submitted:</strong>{" "}
                  {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
                </p>
              )}
              <p className={`comment-status ${comment.approved ? "status-approved" : "status-pending"}`}>
                <strong>Status:</strong> {comment.approved ? "Approved ✅" : "Pending ❌"}
              </p>
              <button onClick={() => toggleApproval(comment)}>
                {comment.approved ? "Disapprove" : "Approve"}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ManageComment;
