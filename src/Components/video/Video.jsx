import React, { useEffect, useState } from "react";
import "./_video.scss";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
const Video = ({ video, channelScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelicon, setchannelicon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const videoId = id?.videoId || contentDetails?.videoId || id;
  
  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [videoId]);

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

  let naviget = useNavigate();
  function handdelvideoclick() {
    naviget(`/watch/${videoId}`);
  }
  return (
    <div className="video" onClick={handdelvideoclick}>
      <div className="video__top">
        {/* <img src={medium.url} alt="" /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__duration">{_duration}</span>
      </div>
      <div className="video__bottom">
        
        {!channelScreen && (
          <LazyLoadImage src={channelicon?.url} effect="blur" />
        )}

        <div className="right">
          <span className="video__title">{title}</span>
          {!channelScreen && <span>{channelTitle}</span>}

          <div className="video__details">
            <span> {numeral(views).format("0.a")} views • </span>
            <span>{moment(publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
