import React, { useEffect } from "react";
import "./watchscreen.scss";
import { Row, Col } from "react-bootstrap";
import VideoMetaData from "../../videometadata/VideoMetaData";
import VideoHorizontal from "../../videohorizontal/VideoHorizontal";
import Comments from "../../comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReletedVideo, getVdeoById } from "../../../Redux/actions/video.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
 
const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVdeoById(id));
    dispatch(getReletedVideo(id));
  }, [dispatch, id]);
  const {videos,loading:reletedloading} =  useSelector(state=>state.reletedVideo)
  const { video, loading } = useSelector((state) => state.selectedVideo);

  return (
    <Row>
      <Col Lg={8}>
        <div className="watchScreen__player">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            title={video?.snippet?.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h3>Loading...</h3>
        )}

        <Comments  videoId={id} totalComment={video?.statistics?.commentCount} />
      </Col>
      <Col Lg={4}>
        {!reletedloading?videos?.filter(video=>video.snippet).map((video) => {
          return <VideoHorizontal video={video} key={video.id.videoId} />;
        }):
        <SkeletonTheme color="#343a40" highlightColor='#3c4147'>
<Skeleton width="100%" height={130} count={25}/>
        </SkeletonTheme>
        
        }
      </Col>
    </Row>
  );
};

export default WatchScreen;
