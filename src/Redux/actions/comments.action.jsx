import request from "../../api";
import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../ActionType";
export const getCommentsDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type: COMMENT_LIST_REQUEST,
      });
  
      const { data } = await request("/commentThreads", {
        params: {
          part: "snippet",
          videoId:id,
        },
      });
      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: data.items,
      });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: COMMENT_LIST_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const addcomment = (id,text) => async (dispatch,getState) => {
    try {
      const comment ={
        snippet:{
          videoId:id,
          topLevelComment:{
            snippet:{
              textOriginal:text,
            }
          }
        }
      }
  console.log(text);
    await request.post('/commentThreads',comment, {
        params: {
          part: "snippet",
          
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
      dispatch({
        type: CREATE_COMMENT_SUCCESS,
        
      });

setTimeout(()=>{
  dispatch(getCommentsDetails(id));
},4000)
      
    } catch (error) {
      
      dispatch({
        type: CREATE_COMMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };