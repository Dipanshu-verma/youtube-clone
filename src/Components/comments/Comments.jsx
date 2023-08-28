import React, { useEffect, useState } from "react";
import Comment from "../comment/Comment";
import "./comments.scss";
import { useDispatch, useSelector } from "react-redux";
import { addcomment, getCommentsDetails } from "../../Redux/actions/comments.action";
const Comments = ({ videoId,totalComment }) => {
 
const[text,setText] = useState('')
  const dispatch = useDispatch();

 const comments   =  useSelector(state=>state.commentList.comments)
const _comments = comments?.map(comment=>comment.snippet.topLevelComment.snippet)
 
  useEffect(() => {
    dispatch(getCommentsDetails(videoId));
  }, [videoId, dispatch]);

  function handdelcomment(e) {
    e.preventDefault();
    if(text.length===0)return
    dispatch(addcomment(videoId,text))
    setText('')
  }
  return (
    <div className="comments">
      <p>{ totalComment} Comments</p>

      <div className="comments__form d-flex my-2 w-100">
        <img
          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
          alt=""
          className="rounded-circle mr-3"
        />
        <form onSubmit={handdelcomment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment.."
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>

      <div className="comments__list">
        {_comments?.map((comment,i) => {
          return <Comment key={i} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
