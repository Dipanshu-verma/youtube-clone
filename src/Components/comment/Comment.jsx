import React from 'react'
import './comment.scss'
import moment from 'moment'
const Comment = ({comment}) => {
  const {authorDisplayName,authorProfileImageUrl,textDisplay,publishedAt} = comment
  return (
    <div className='comment p-2 d-flex'>
      <img
          src={authorProfileImageUrl}
          alt=""
          className="rounded-circle"
        />

        <div className="comment__body">
            <p className="comment__header mb-1">
            {authorDisplayName} • {moment(publishedAt).fromNow()}
            </p>
            <p className="comment__header mb-1">{textDisplay}</p>
        </div>
       
    </div>
  )
}

export default Comment
