import React, { useEffect } from 'react'
import './_loginscreen.scss'
 import  {login}  from '../../Redux/actions/authaction'
 
 import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
const LoginScreen = () => {
  const dispatch = useDispatch();

const accessToken = useSelector(state=>state.auth.accessToken)
const navigate = useNavigate();

useEffect(()=>{
  if(accessToken){
    navigate('/');
  }

},[accessToken,navigate])

  function handdleLogin(){
  dispatch(login());
  }
  return (
   <div className="login">
    <div className="login__container">
        <img  src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
        <button onClick={handdleLogin}>Login With google</button>
        <p>this project is made using you tube api</p>
    </div>
   </div>
  )
}

export default LoginScreen
