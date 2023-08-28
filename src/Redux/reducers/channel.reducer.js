import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../ActionType";

export const channelDetailsReducer =(state={
    loading:true,
    channel:{},
    subscriptionStatus:false,
  },action) =>{
    const{type, payload} = action;
  
    switch(type){
      case CHANNEL_DETAILS_SUCCESS:return{
        ...state,loading:false,channel:payload
      }
      case CHANNEL_DETAILS_REQUEST:return{
        ...state,loading:true
      }
      case CHANNEL_DETAILS_FAIL:return{
        ...state,loading:false, channel:null, error:payload
      }
      case SET_SUBSCRIPTION_STATUS:return{
        ...state,subscriptionStatus:payload
      }
      default: return state
    }
  }