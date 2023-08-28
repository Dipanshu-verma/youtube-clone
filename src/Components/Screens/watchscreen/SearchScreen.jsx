import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getVideoBySearch } from '../../../Redux/actions/video.action';
import { Container } from 'react-bootstrap';
import VideoHorizontal from '../../videohorizontal/VideoHorizontal';

const SearchScreen = () => {
    const {query} = useParams();
 
   const dispatch =  useDispatch();
   
   useEffect(()=>{
dispatch(getVideoBySearch(query))
   },[dispatch,query])
 
   const {videos,loading} = useSelector(state=>state.searchVideo)

  return (
     <Container>

      {
        !loading ? videos?.map((video)=>{
         return <VideoHorizontal video={video} key={video.id.videoId} searchScreeen/>
        }):<h1>Loading....</h1>
      }
     </Container>
  )
}

export default SearchScreen
