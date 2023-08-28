import React from "react";
import "./_header.scss";
 
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import {IoMdNotifications} from "react-icons/io";
import {MdApps} from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = ({handl}) => {


  const[input,setInput]  = useState('');
  const naviget  = useNavigate();
  function handleSearch(e){
    e.preventDefault();
naviget(`/search/${input}`)
  }


  
  const {user} =  useSelector(state=>state.auth);
  
  const urlphoto = user?.photoURL;
  console.log(user, urlphoto);
  return (
    <div className="border border-dark header">
    <div className="d-flex align-items-center gap-3" >
      <FaBars className="header__menu" size={26} onClick={()=>{handl()}} />
    
 
      <img
        src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt=""
        className="header__logo"
      />
   </div>
    
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" value={input}  onChange={(e)=>setInput(e.target.value)} />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>
     
 
      <div className="header__icons">
        <IoMdNotifications size={28}/>
        <MdApps size={28}/>
        <img src={urlphoto} alt="" />
      </div>
    </div>
  );
};

export default Header;
