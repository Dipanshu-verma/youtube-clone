import React, { useEffect } from 'react'
import "./subscriptions.scss"
import { useDispatch, useSelector } from 'react-redux'
import {getSubscriptionsChannel } from '../../../Redux/actions/video.action';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {Container } from 'react-bootstrap';
import CardSub from '../../subscriptioncard/CardSub';
const SubscriptionsScreen = () => {

 const dispatch =  useDispatch();
 useEffect(()=>{
    setTimeout(() => {
        dispatch(getSubscriptionsChannel())
    }, 2000);
   
 },[dispatch])


 const {videos,loading} = useSelector(state=>state.subscriptionsChannels)

  return (
     <Container fluid>
{
    !loading?(
        videos?.map((video)=>{
return <CardSub video={video} key={video.id}/>
        })
    ):<SkeletonTheme color="#343a40" highlightColor='#3c4147'>
        <Skeleton height="160px" width="100%" />
    </SkeletonTheme>
}
     </Container>
  )
}

export default SubscriptionsScreen
