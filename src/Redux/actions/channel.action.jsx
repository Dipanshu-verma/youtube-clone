import request from "../../api";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../ActionType";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });

    const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id:id,
      },
    });
    console.log(data);
    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.response.message);
    dispatch({
      type: CHANNEL_DETAILS_FAIL,
      payload: error.response.message,
    });
  }
};

export const channelSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    console.log("Subscription API Response:", data);

    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0,
    });
  } catch (error) {
    console.log("Error fetching subscription status:", error.message);
  }
};

