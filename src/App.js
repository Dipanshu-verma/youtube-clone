import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "./Components/header/Header";
import Sidebar from "./Components/sidebar/Sidebar";
import HomeScreen from "./Components/Screens/homescreen/HomeScreen";
import "./_app.scss";
import { useState } from "react";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WatchScreen from "./Components/Screens/watchscreen/WatchScreen";
import SearchScreen from "./Components/Screens/watchscreen/SearchScreen";
import SubscriptionsScreen from "./Components/Screens/subscriptions/SubscriptionsScreen";
import ChannelScreen from "./Components/Screens/channelscreen/ChannelScreen";
const Leyout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handl = () => {
    toggleSidebar(!sidebar);
  };
  return (
    <>
      <Header handl={handl} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handl={handl} />
        <Container>{children}</Container>
      </div>
    </>
  );
};

 
const App = () => {



   const accessToken = useSelector((state) => state.auth.accessToken);
   const loading = useSelector((state) => state.auth.loading);
    const naviget  =  useNavigate();

     useEffect(()=>{
    
  if(!loading&&(accessToken===null)){
    naviget('/auth')
    
  }
 
 
},[accessToken,loading,naviget])




  return (
    <Routes>
      <Route path="/"  element={ <Leyout><HomeScreen/></Leyout> } />
      <Route path="/auth"  element={<LoginScreen/>}/>
      <Route path="/search/:query"  element={ <Leyout> <SearchScreen/> </Leyout>  }/>
      <Route path="/feed/subscriptions"  element={ <Leyout> <SubscriptionsScreen/> </Leyout>  }/>
      <Route path="/channel/:channelId"  element={ <Leyout> <ChannelScreen/> </Leyout>  }/>
      <Route path="*"  element={<Navigate to='/'/>} />
      <Route path="/watch/:id"  element={ <Leyout><WatchScreen/></Leyout>}/>
    </Routes>
  );
};

export default App;

