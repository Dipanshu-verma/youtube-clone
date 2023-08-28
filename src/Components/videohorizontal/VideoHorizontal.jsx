import React, { useEffect, useState } from "react";
import "./videohorizontal.scss";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const VideoHorizontal = ({ video, searchScreeen}) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelicon, setchannelicon] = useState(null);

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [id]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setchannelicon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  
  const naviget = useNavigate();
  function handdelclick() {
    naviget(`/watch/${id.videoId}`);
  }
  return (
    <Row className="videoHoriZontal m-1 py-1">
      <Col md={searchScreeen ? 4 : 6} className="videoHoriZontal__left">
      
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className="videoHoriZontal__thumbnail"
          wrapperClassName="videoHoriZontal__thumbnail-wrapper"
          onClick={handdelclick}
        />
      
       
         
        <span className="videoHoriZontal__duration">{_duration}</span>
    
        
      </Col>
      <Col md={searchScreeen ? 8 : 6} className="videoHoriZontal__right p-0">
        <p className="videoHoriZontal__title mb-0">{title}</p>

        {
         searchScreeen &&<div className="videohoriZontal__details my-2">
          {numeral(views).format("0.a")} views • {moment(publishedAt).fromNow()}
        </div>
        }
        <div className="videohoriZontal__channel d-flex align-items-center gap-2">

          {searchScreeen&& (
            <div>
              <img
                src={channelicon?.url}
                alt=""
                style={{ width: "36px", height: "36px", borderRadius: "50%" }}
              />
            </div>
          ) 
          }
         

          {channelTitle}
        </div>
        {
         !searchScreeen &&<div className="videohoriZontal__details">
          {numeral(views).format("0.a")} views • {moment(publishedAt).fromNow()}
        </div>
        }
       
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
