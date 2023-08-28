import {
  CHANNEL_VIDEO_FAIL,
  CHANNEL_VIDEO_REQUEST,
  CHANNEL_VIDEO_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELETED_VIDEO_FAIL,
  RELETED_VIDEO_REQUEST,
  RELETED_VIDEO_SUCCESS,
  SEARCH_VIDEO_FAIL,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS
} from "../ActionType";
 
import request from "../../api";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 30,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });
    console.log(data);
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,

      payload: error.message,
    });
  }
};

export const getVideosCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,

        q: keyword,
        type: "video",
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,

        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,

      payload: error.message,
    });
  }
};

export const getVdeoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getReletedVideo = (id) => async (dispatch) => {
 
  try {
    dispatch({
      type: RELETED_VIDEO_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId:id,
        maxResults:15,
        type:'video'
      },
    });
    dispatch({
      type: RELETED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: RELETED_VIDEO_FAIL,
      payload:error.response.data.message,
    });
  }
};


export const getVideoBySearch=(query)=> async (dispatch) =>{
  try{

    dispatch({
      type:SEARCH_VIDEO_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part:"snippet",
        q:query,
        maxResults:20,
        type:'video'
      },
    });
   console.log(data);
    dispatch({
      type:SEARCH_VIDEO_SUCCESS,
      payload: data.items,
    });

  }catch(error){
   console.log( error.message);
    dispatch({
      type:SEARCH_VIDEO_FAIL,
      payload: error.message,
    });
  }
} 


 
export const getSubscriptionsChannel = () => async (dispatch, getState) => {

  try {
   
    dispatch({
      type:SUBSCRIPTIONS_CHANNEL_REQUEST,
    })
 
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        maxResults:10,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    
console.log(data);
    dispatch({
      type:SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items,
    });

  } catch (error) {
    console.log("Error fetching subscription status:", error.response.data);
    dispatch({
      type:SUBSCRIPTIONS_CHANNEL_FAIL,
      payload:error.response.data,
    })
  }

}

export const getVideosatChannel = (id) => async (dispatch) => {

  try {
   
    dispatch({
      type:CHANNEL_VIDEO_REQUEST,
    })

    const { data:{items} } = await request("/channels", {
      params: {
        part: "contentDetails",
       id:id,
      },
     
    });

     
const uploadPlaylistId = items[0]?.contentDetails?.relatedPlaylists?.uploads
 

// get the video using id 

const { data } = await request("/playlistItems", {
  params: {
    part: "contentDetails,snippet",
   playlistId:uploadPlaylistId,
   maxResults:30,
  },
 
});
    dispatch({
      type:CHANNEL_VIDEO_SUCCESS,
      payload:data.items,
    });
  } catch (error) {
    console.log("Error fetching subscription status:", error.response.data);
    dispatch({
      type:CHANNEL_VIDEO_FAIL,
      payload:error.response.data,
    })
  }

}