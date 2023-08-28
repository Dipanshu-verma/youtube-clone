import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Categories from "../../categorybar/Categories";
import Video from "../../video/Video";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularVideos,
  getVideosCategory,
} from "../../../Redux/actions/video.action";
// import InfiniteScroll from "react-infinite-scroll-component"
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "../../skeletons/SkeletonVideo";
const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos,activeCategory,loading } = useSelector((state) => state.homeVideos);
   

 
  function fetchData() {
    // console.log(activeCategory);
    if (activeCategory === "All"){
      dispatch(getPopularVideos());
    }
    else {
      dispatch(getVideosCategory(activeCategory));
    }
  }

  return (
    <div style={{width:"97%",}}>
    <Container>
      <Categories />
      <Row>
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          Loader={
            <div className="spinner-border text-danger d-block mx-auto"></div>
          }
          className="row"
        >
          {!loading?videos.map((video,index) => {
            return (
              <Col key={index} lg={4} md={3}>
                <Video key={video.id} video={video} />
              </Col>
            );
          }):
           [...Array(20)].map(()=>{
            return <Col lg={3} md={4}>
          
            <SkeletonVideo/>
            </Col>
           })
          }
        </InfiniteScroll>
      </Row>
    </Container>
    </div>
  );
};

export default HomeScreen;
