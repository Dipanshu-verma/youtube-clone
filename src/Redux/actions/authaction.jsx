// authaction.jsx
import firebase from 'firebase/compat/app';
import auth from "../../Firebase";
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS,LOG_OUT } from '../ActionType';
 

// The rest of your code remains the same

export const login=()=>  async (dispatch) => { // Added 'return' keyword
    try {

        dispatch({
            type:LOGIN_REQUEST
        })

      const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")
      let res = await auth.signInWithPopup(provider);  
    
      console.log(res);
      const accessToken = res.credential.accessToken;
      
      const profile= {
        name:res.additionalUserInfo.profile.name,
        photoURL:res.additionalUserInfo.profile.picture,
      }
    
      sessionStorage.setItem("ytc-access-token", accessToken);
      sessionStorage.setItem("ytc-user", JSON.stringify(profile));

      dispatch({
        type:LOGIN_SUCCESS,
        payload:accessToken,
      })
      dispatch({
        type:LOAD_PROFILE,
        payload:profile,
      })
    } catch (error) {

      console.error(error.message);
      dispatch({
        type:LOGIN_FAIL,
        payload:error.message
      })

    }
  };


  export const logout=()=> async (dispatch)=>{
 
    await auth.signOut();
    sessionStorage.removeItem("ytc-access-token")
    sessionStorage.removeItem("ytc-user")
    dispatch({
      type:LOG_OUT,

    })

  }
