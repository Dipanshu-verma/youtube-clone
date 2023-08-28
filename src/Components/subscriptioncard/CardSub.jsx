import React from 'react'
import { useNavigate } from 'react-router-dom';
import './card.scss'
const CardSub = ({video}) => {
    const {
        id,
        snippet: {
          title,
          description,
          thumbnails: { medium },
          resourceId,
        },
        contentDetails:{
            totalItemCount,
        },
      } = video;

      const _channelId  = resourceId?.channelId || id.channelId 
    //   const totalVideo =  contentDetails?.totalItemCount
      console.log(_channelId);
    const naviget  =  useNavigate();
      function handleChannel(){
naviget(`/channel/${_channelId}`)

      }
  return (
    <div className='d-flex justify-content-space-between align-items-center my-4 px-3 gap-4 channel-icon' onClick={handleChannel}>
       <img src={medium?.url} alt="" />
       <div>
       <h2 style={{color:"#fff"}} >{title}</h2>
       <p className='mb-1 icon-thumnail'>{description}</p>
       <p>{totalItemCount} videos</p>
       </div>
   
    </div>
  )
}

export default CardSub
 
