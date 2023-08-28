import React, { useEffect } from 'react'
import "./videometadata.scss"
import numeral from 'numeral'
import moment from 'moment'
import ReactShowMoreText from 'react-show-more-text'
import { MdThumbUp,MdThumbDown } from 'react-icons/md'
import { useDispatch, useSelector } from "react-redux"; 
import { channelSubscriptionStatus, getChannelDetails } from '../../Redux/actions/channel.action'
const VideoMetaData = ({video:{snippet,statistics},videoId}) => {

  const{channelId,channelTitle,description,title,publishedAt} = snippet
const{viewCount,likeCount,dislikeCount} = statistics

  const dispatch= useDispatch();

  useEffect(()=>{
dispatch(getChannelDetails(channelId))
dispatch(channelSubscriptionStatus(channelId))
  },[dispatch,channelId])
 
  const {snippet:channelSnippet,statistics:channelStatistics}=useSelector(state=>state.channelDetails.channel);
  const subscriptionStatus = useSelector(state=>state.channelDetails.subscriptionStatus)
  console.log(subscriptionStatus);
  return (
    <div className="videoMetaData py-2">
        <div className="videoMetaData__top">
            <h5>{title}</h5>
            <div className="d-flex justify-content-between align-items-center py-1">
            <span> {numeral(viewCount).format("0.a")} views • 
            {moment(publishedAt).fromNow()}</span>
            
            <div>
                <span className='mr-3'>
                    <MdThumbUp size={23}/>
                    {numeral(likeCount).format("0.a")}
                </span>
                <span  style={{marginLeft:"1rem"}}>
                    <MdThumbDown size={23}/>
                   { numeral(dislikeCount).format("0.a")}
                </span>
            </div>
            </div>
        </div>
        <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
            <div className='d-flex'>
            <img src={channelSnippet?.thumbnails?.default?.url} alt="" className='rounded-circle '/>
          <div className='d-flex flex-column  px-3'>
                  <span>{channelTitle}</span>
                  <span>{numeral(channelStatistics?.subscriberCount).format("0.a")} Subscriber</span>
          </div>
            </div>
            <button className="btn  px-3 m-2">{subscriptionStatus?'Subscribed':'Subscribe'}</button>
        </div>
        <div className="videoMetaData__description">
        <ReactShowMoreText
        lines={3}
        more="Show More"
        less="Show Less"
        anchorClass='showMoreText'
        expanded={false}
        >
              {description}
               </ReactShowMoreText>
        </div>
    </div>
  )
}

export default VideoMetaData
