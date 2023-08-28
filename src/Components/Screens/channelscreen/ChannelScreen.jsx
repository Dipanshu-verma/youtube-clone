import React, { useEffect } from 'react'
import "./channelscreen.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getVideosatChannel } from '../../../Redux/actions/video.action';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Video from '../../video/Video';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { getChannelDetails } from '../../../Redux/actions/channel.action';
import numeral from 'numeral';
const ChannelScreen = () => {
const {channelId} = useParams();

    const dispatch=useDispatch();
    useEffect(()=>{
dispatch(getVideosatChannel(channelId));
dispatch(getChannelDetails(channelId));
    },[dispatch,channelId])

    console.log("channel");
    const {videos,loading} = useSelector(state=>state.channelVideos)
    const { snippet,statistics } = useSelector(state=>state.channelDetails.channel)

console.log("channel",videos);
  return (
   <>
   <div className='px-5 py-2 my-2 d-flex align-items-center channelHeader'>
     <div className='d-flex align-items-center channelHeader__left' >
     <img src={snippet?.thumbnails?.default?.url} alt="" />
    <div className='ml-3 channelHeader_details' >
     <h3>{snippet?.title}</h3>
     <span>
    {
      numeral(statistics?.subscriberCount).format('0.a')}
    
      &nbsp; Subscribers
    
     </span>
    </div>

   
     </div>
     <button>Subscribe</button>
   </div>
    <Container>
     <Row className='mt-2'>
      {
        !loading? videos?.map((video)=>{
          return <Col md={3} lg={4}>
          <Video video={video} channelScreen />

          </Col>
        }):

        [...Array(30)].map(()=>{
         return <Col md={3} lg={4}>
          <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147' >
              <Skeleton width="100%" height="140px"  />
            </SkeletonTheme>
          </Col>
        })
       
      }
      </Row>
    </Container>
   </>
  )
}

export default ChannelScreen
